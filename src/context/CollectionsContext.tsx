import React, { createContext, useContext, useState, useEffect } from 'react';
import { collectionsApi } from '../api/client';
import type { Collection, Item } from '../types';

interface CollectionsContextType {
    collections: Collection[];
    loading: boolean;
    fetchCollections: () => Promise<void>;
    addCollection: (name: string, icon: string, description: string) => Promise<void>;
    removeCollection: (id: string) => Promise<void>;
    addItem: (collectionId: string, itemData: Partial<Item>) => Promise<void>;
    updateItem: (collectionId: string, itemId: string, itemData: Partial<Item>) => Promise<void>;
    removeItem: (collectionId: string, itemId: string) => Promise<void>;
}

const CollectionsContext = createContext<CollectionsContextType | undefined>(undefined);

export const CollectionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [collections, setCollections] = useState<Collection[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCollections = async () => {
        setLoading(true);
        try {
            const data = await collectionsApi.getAll();
            setCollections(data);
        } catch (error) {
            console.error('Error fetching collections:', error);
        } finally {
            setLoading(false);
        }
    };

    const addCollection = async (name: string, icon: string, description: string) => {
        try {
            await collectionsApi.create(name, icon, description);
            await fetchCollections();
        } catch (error) {
            console.error('Error adding collection:', error);
            throw error;
        }
    };

    const removeCollection = async (id: string) => {
        try {
            await collectionsApi.delete(id);
            await fetchCollections();
        } catch (error) {
            console.error('Error removing collection:', error);
        }
    };

    const addItem = async (collectionId: string, itemData: Partial<Item>) => {
        try {
            await collectionsApi.addItem(collectionId, itemData);
            await fetchCollections();
        } catch (error) {
            console.error('Error adding item:', error);
            throw error;
        }
    };

    const updateItem = async (collectionId: string, itemId: string, itemData: Partial<Item>) => {
        try {
            await collectionsApi.updateItem(collectionId, itemId, itemData);
            await fetchCollections();
        } catch (error) {
            console.error('Error updating item:', error);
            throw error;
        }
    };

    const removeItem = async (collectionId: string, itemId: string) => {
        try {
            await collectionsApi.deleteItem(collectionId, itemId);
            await fetchCollections();
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    useEffect(() => {
        fetchCollections();
    }, []);

    return (
        <CollectionsContext.Provider value={{ 
            collections, loading, fetchCollections, 
            addCollection, removeCollection, 
            addItem, updateItem, removeItem 
        }}>
            {children}
        </CollectionsContext.Provider>
    );
};

export const useCollections = () => {
    const context = useContext(CollectionsContext);
    if (!context) throw new Error('useCollections must be used within a CollectionsProvider');
    return context;
};
