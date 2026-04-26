import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(__dirname, '..', 'data', 'collections.json');

// Asegurar que existe el directorio de datos
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Inicializar archivo de datos si no existe
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([
        { id: '1', name: 'Libros', icon: 'Book', count: 0, description: 'Mi colección personal de libros favoritos.', items: [] },
        { id: '2', name: 'Monedas', icon: 'Coins', count: 0, description: 'Monedas antiguas y raras de todo el mundo.', items: [] }
    ], null, 2));
}

export const getCollections = () => {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
};

export const saveCollection = (collection: any) => {
    const collections = getCollections();
    const newCollection = {
        id: Date.now().toString(),
        name: collection.name,
        icon: collection.icon,
        description: collection.description || '',
        count: 0,
        items: []
    };
    collections.push(newCollection);
    fs.writeFileSync(DATA_FILE, JSON.stringify(collections, null, 2));
    return newCollection;
};

export const deleteCollection = (id: string) => {
    let collections = getCollections();
    collections = collections.filter((c: any) => c.id !== id);
    fs.writeFileSync(DATA_FILE, JSON.stringify(collections, null, 2));
};

// --- GESTIÓN DE ITEMS ---

export const addItemToCollection = (collectionId: string, itemData: any) => {
    const collections = getCollections();
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

    fs.writeFileSync(DATA_FILE, JSON.stringify(collections, null, 2));
    return newItem;
};

// Eliminar un elemento específico
export const deleteItemFromCollection = (collectionId: string, itemId: string) => {
    const collections = getCollections();
    const collectionIndex = collections.findIndex((c: any) => c.id === collectionId);
    
    if (collectionIndex === -1) return;

    if (collections[collectionIndex].items) {
        collections[collectionIndex].items = collections[collectionIndex].items.filter((item: any) => item.id !== itemId);
        collections[collectionIndex].count = collections[collectionIndex].items.length;
        fs.writeFileSync(DATA_FILE, JSON.stringify(collections, null, 2));
    }
};

// Actualizar un elemento existente
export const updateItemInCollection = (collectionId: string, itemId: string, itemData: any) => {
    const collections = getCollections();
    const collectionIndex = collections.findIndex((c: any) => c.id === collectionId);
    
    if (collectionIndex === -1) throw new Error('Colección no encontrada');

    const itemIndex = collections[collectionIndex].items.findIndex((item: any) => item.id === itemId);
    if (itemIndex === -1) throw new Error('Elemento no encontrado');

    collections[collectionIndex].items[itemIndex] = {
        ...collections[collectionIndex].items[itemIndex],
        ...itemData,
        updatedAt: new Date().toISOString()
    };

    fs.writeFileSync(DATA_FILE, JSON.stringify(collections, null, 2));
    return collections[collectionIndex].items[itemIndex];
};
