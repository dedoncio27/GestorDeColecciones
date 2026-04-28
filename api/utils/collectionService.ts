import { Redis } from '@upstash/redis';

let redis: Redis | null = null;
let inMemoryData: any[] | null = null;

try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
} catch (error) {
  console.error('Failed to initialize Redis:', error);
}

const COLLECTIONS_KEY = 'collections';

// Inicializar datos si no existen
const initializeData = async () => {
  if (redis) {
    try {
      const exists = await redis.exists(COLLECTIONS_KEY);
      if (!exists) {
        const initialData = [
          { id: '1', name: 'Libros', icon: 'Book', count: 0, description: 'Mi colección personal de libros favoritos.', items: [] },
          { id: '2', name: 'Monedas', icon: 'Coins', count: 0, description: 'Monedas antiguas y raras de todo el mundo.', items: [] }
        ];
        await redis.set(COLLECTIONS_KEY, JSON.stringify(initialData));
      }
    } catch (error) {
      console.error('Redis error in initializeData:', error);
      // Fallback to in-memory
      if (!inMemoryData) {
        inMemoryData = [
          { id: '1', name: 'Libros', icon: 'Book', count: 0, description: 'Mi colección personal de libros favoritos.', items: [] },
          { id: '2', name: 'Monedas', icon: 'Coins', count: 0, description: 'Monedas antiguas y raras de todo el mundo.', items: [] }
        ];
      }
    }
  } else {
    // No Redis, use in-memory
    if (!inMemoryData) {
      inMemoryData = [
        { id: '1', name: 'Libros', icon: 'Book', count: 0, description: 'Mi colección personal de libros favoritos.', items: [] },
        { id: '2', name: 'Monedas', icon: 'Coins', count: 0, description: 'Monedas antiguas y raras de todo el mundo.', items: [] }
      ];
    }
  }
};

export const getCollections = async () => {
  await initializeData();
  if (redis && !inMemoryData) {
    try {
      const data = await redis.get(COLLECTIONS_KEY) as string | null;
      if (!data) {
        console.warn('No Redis data found for collections, using fallback.');
        inMemoryData = [
          { id: '1', name: 'Libros', icon: 'Book', count: 0, description: 'Mi colección personal de libros favoritos.', items: [] },
          { id: '2', name: 'Monedas', icon: 'Coins', count: 0, description: 'Monedas antiguas y raras de todo el mundo.', items: [] }
        ];
        return inMemoryData;
      }
      return JSON.parse(data);
    } catch (error) {
      console.error('Redis error in getCollections:', error);
      return inMemoryData || [];
    }
  } else {
    return inMemoryData || [];
  }
};

export const saveCollection = async (collection: any) => {
  const collections = await getCollections();
  const newCollection = {
    id: Date.now().toString(),
    name: collection.name,
    icon: collection.icon,
    description: collection.description || '',
    count: 0,
    items: []
  };
  collections.push(newCollection);
  if (redis && !inMemoryData) {
    try {
      await redis.set(COLLECTIONS_KEY, JSON.stringify(collections));
    } catch (error) {
      console.error('Redis error in saveCollection:', error);
      inMemoryData = collections;
    }
  } else {
    inMemoryData = collections;
  }
  return newCollection;
};

export const deleteCollection = async (id: string) => {
  let collections = await getCollections();
  collections = collections.filter((c: any) => c.id !== id);
  if (redis && !inMemoryData) {
    try {
      await redis.set(COLLECTIONS_KEY, JSON.stringify(collections));
    } catch (error) {
      console.error('Redis error in deleteCollection:', error);
      inMemoryData = collections;
    }
  } else {
    inMemoryData = collections;
  }
};

// --- GESTIÓN DE ITEMS ---

export const addItemToCollection = async (collectionId: string, itemData: any) => {
  const collections = await getCollections();
  const collectionIndex = collections.findIndex((c: any) => c.id === collectionId);

  if (collectionIndex === -1) throw new Error('Colección no encontrada');

  const newItem = {
    id: Date.now().toString(),
    collectionId,
    name: itemData.name,
    description: itemData.description,
    imageUrl: itemData.imageUrl,
    rating: itemData.rating,
    date: itemData.date,
    createdAt: new Date().toISOString()
  };

  if (!collections[collectionIndex].items) {
    collections[collectionIndex].items = [];
  }

  collections[collectionIndex].items.push(newItem);
  collections[collectionIndex].count = collections[collectionIndex].items.length;

  if (redis && !inMemoryData) {
    try {
      await redis.set(COLLECTIONS_KEY, JSON.stringify(collections));
    } catch (error) {
      console.error('Redis error in addItemToCollection:', error);
      inMemoryData = collections;
    }
  } else {
    inMemoryData = collections;
  }
  return newItem;
};

// Eliminar un elemento específico
export const deleteItemFromCollection = async (collectionId: string, itemId: string) => {
  const collections = await getCollections();
  const collectionIndex = collections.findIndex((c: any) => c.id === collectionId);

  if (collectionIndex === -1) return;

  if (collections[collectionIndex].items) {
    collections[collectionIndex].items = collections[collectionIndex].items.filter((item: any) => item.id !== itemId);
    collections[collectionIndex].count = collections[collectionIndex].items.length;
    if (redis && !inMemoryData) {
      try {
        await redis.set(COLLECTIONS_KEY, JSON.stringify(collections));
      } catch (error) {
        console.error('Redis error in deleteItemFromCollection:', error);
        inMemoryData = collections;
      }
    } else {
      inMemoryData = collections;
    }
  }
};

// Actualizar un elemento existente
export const updateItemInCollection = async (collectionId: string, itemId: string, itemData: any) => {
  const collections = await getCollections();
  const collectionIndex = collections.findIndex((c: any) => c.id === collectionId);

  if (collectionIndex === -1) throw new Error('Colección no encontrada');

  const itemIndex = collections[collectionIndex].items.findIndex((item: any) => item.id === itemId);
  if (itemIndex === -1) throw new Error('Elemento no encontrado');

  collections[collectionIndex].items[itemIndex] = {
    ...collections[collectionIndex].items[itemIndex],
    ...itemData
  };

  if (redis && !inMemoryData) {
    try {
      await redis.set(COLLECTIONS_KEY, JSON.stringify(collections));
    } catch (error) {
      console.error('Redis error in updateItemInCollection:', error);
      inMemoryData = collections;
    }
  } else {
    inMemoryData = collections;
  }
  return collections[collectionIndex].items[itemIndex];
};