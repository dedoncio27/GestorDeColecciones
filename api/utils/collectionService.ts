import { Redis } from '@upstash/redis';

const kv = new Redis({
  url: process.env.KV_REST_API_URL || '',
  token: process.env.KV_REST_API_TOKEN || '',
});

const COLLECTIONS_KEY = 'collections';
const THEME_COLOR_KEY = 'themeColor';
const COLLECTION_BG_COLOR_KEY = 'collectionBgColor';

const defaultCollections = [
  { id: '1', name: 'Libros', icon: 'Book', count: 0, description: 'Mi colección personal de libros favoritos.', items: [] },
  { id: '2', name: 'Monedas', icon: 'Coins', count: 0, description: 'Monedas antiguas y raras de todo el mundo.', items: [] }
];

const defaultThemeColor = '#3f5efb';
const defaultCollectionBgColor = '#f0f2f5';

const parseCollections = (value: any) => {
  if (!value) return null;
  if (typeof value === 'object') return value;
  try {
    return JSON.parse(value);
  } catch (error) {
    console.error('Failed to parse collections from KV:', error);
    return null;
  }
};

const getCollectionsFromKv = async () => {
  try {
    const stored = await kv.get(COLLECTIONS_KEY);
    return parseCollections(stored ?? null);
  } catch (error) {
    console.error('KV error reading collections:', error);
    return null;
  }
};

const saveCollectionsToKv = async (collections: any[]) => {
  try {
    await kv.set(COLLECTIONS_KEY, JSON.stringify(collections));
    console.log(`Successfully saved ${collections.length} collections to KV`);
  } catch (error) {
    console.error('CRITICAL: KV error writing collections:', error);
    throw new Error('No se pudo guardar en la base de datos. Verifica la configuración de Vercel KV.');
  }
};

const ensureCollections = async () => {
  const collections = await getCollectionsFromKv();
  if (collections && Array.isArray(collections)) {
    return collections;
  }
  await saveCollectionsToKv(defaultCollections);
  return defaultCollections;
};

export const getCollections = async () => {
  return await ensureCollections();
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
  const updated = [...collections, newCollection];
  await saveCollectionsToKv(updated);
  return newCollection;
};

export const deleteCollection = async (id: string) => {
  const collections = await getCollections();
  const updated = collections.filter((c: any) => c.id !== id);
  await saveCollectionsToKv(updated);
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

  collections[collectionIndex].items = collections[collectionIndex].items || [];
  collections[collectionIndex].items.push(newItem);
  collections[collectionIndex].count = collections[collectionIndex].items.length;
  await saveCollectionsToKv(collections);
  return newItem;
};

export const deleteItemFromCollection = async (collectionId: string, itemId: string) => {
  const collections = await getCollections();
  const collectionIndex = collections.findIndex((c: any) => c.id === collectionId);
  if (collectionIndex === -1) return;

  const items = collections[collectionIndex].items || [];
  collections[collectionIndex].items = items.filter((item: any) => item.id !== itemId);
  collections[collectionIndex].count = collections[collectionIndex].items.length;
  await saveCollectionsToKv(collections);
};

export const updateItemInCollection = async (collectionId: string, itemId: string, itemData: any) => {
  const collections = await getCollections();
  const collectionIndex = collections.findIndex((c: any) => c.id === collectionId);
  if (collectionIndex === -1) throw new Error('Colección no encontrada');

  const items = collections[collectionIndex].items || [];
  const itemIndex = items.findIndex((item: any) => item.id === itemId);
  if (itemIndex === -1) throw new Error('Elemento no encontrado');

  collections[collectionIndex].items[itemIndex] = {
    ...collections[collectionIndex].items[itemIndex],
    ...itemData
  };
  await saveCollectionsToKv(collections);
  return collections[collectionIndex].items[itemIndex];
};

export const getSettings = async () => {
  try {
    const themeColor = await kv.get<string>(THEME_COLOR_KEY);
    const collectionBgColor = await kv.get<string>(COLLECTION_BG_COLOR_KEY);
    return {
      themeColor: themeColor || defaultThemeColor,
      collectionBgColor: collectionBgColor || defaultCollectionBgColor,
    };
  } catch (error) {
    console.error('KV error reading settings:', error);
    return {
      themeColor: defaultThemeColor,
      collectionBgColor: defaultCollectionBgColor,
    };
  }
};

export const saveSettings = async ({ themeColor, collectionBgColor }: { themeColor?: string; collectionBgColor?: string }) => {
  try {
    if (themeColor) await kv.set(THEME_COLOR_KEY, themeColor);
    if (collectionBgColor) await kv.set(COLLECTION_BG_COLOR_KEY, collectionBgColor);
    return {
      themeColor: themeColor || defaultThemeColor,
      collectionBgColor: collectionBgColor || defaultCollectionBgColor,
    };
  } catch (error) {
    console.error('KV error saving settings:', error);
    throw new Error('Error al guardar la configuración en KV');
  }
};