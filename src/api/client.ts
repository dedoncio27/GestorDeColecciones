import axios from 'axios';
import type { Collection, Item } from '../types';

// Para desarrollo: localhost:5000
// Para producción en Vercel: usar un backend externo (servidor Node en Railway, Render, etc.)
const API_URL = import.meta.env.VITE_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api/collections'
    : '/api/collections');

export const collectionsApi = {
    async getAll(): Promise<Collection[]> {
        const response = await axios.get(API_URL);
        return response.data;
    },

    async create(name: string, icon: string, description: string): Promise<Collection> {
        const response = await axios.post(API_URL, { name, icon, description });
        return response.data;
    },

    async delete(id: string): Promise<void> {
        await axios.delete(`${API_URL}/${id}`);
    },

    // --- GESTIÓN DE ITEMS ---
    async addItem(collectionId: string, itemData: Partial<Item>): Promise<Item> {
        const response = await axios.post(`${API_URL}/${collectionId}/items`, itemData);
        return response.data;
    },

    async updateItem(collectionId: string, itemId: string, itemData: Partial<Item>): Promise<Item> {
        const response = await axios.put(`${API_URL}/${collectionId}/items/${itemId}`, itemData);
        return response.data;
    },

    async deleteItem(collectionId: string, itemId: string): Promise<void> {
        await axios.delete(`${API_URL}/${collectionId}/items/${itemId}`);
    }
};
