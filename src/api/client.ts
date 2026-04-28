import axios from 'axios';
import type { Collection, Item } from '../types';

const API_ROOT = import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api'
    : '/api');

const COLLECTIONS_URL = `${API_ROOT}/collections`;
const SETTINGS_URL = `${API_ROOT}/settings`;

export const collectionsApi = {
    async getAll(): Promise<Collection[]> {
        const response = await axios.get(COLLECTIONS_URL);
        return response.data;
    },

    async create(name: string, icon: string, description: string): Promise<Collection> {
        const response = await axios.post(COLLECTIONS_URL, { name, icon, description });
        return response.data;
    },

    async delete(id: string): Promise<void> {
        await axios.delete(`${COLLECTIONS_URL}/${id}`);
    },

    async addItem(collectionId: string, itemData: Partial<Item>): Promise<Item> {
        const response = await axios.post(`${COLLECTIONS_URL}/${collectionId}/items`, itemData);
        return response.data;
    },

    async updateItem(collectionId: string, itemId: string, itemData: Partial<Item>): Promise<Item> {
        const response = await axios.put(`${COLLECTIONS_URL}/${collectionId}/items/${itemId}`, itemData);
        return response.data;
    },

    async deleteItem(collectionId: string, itemId: string): Promise<void> {
        await axios.delete(`${COLLECTIONS_URL}/${collectionId}/items/${itemId}`);
    }
};

export const settingsApi = {
    async get() {
        const response = await axios.get(SETTINGS_URL);
        return response.data;
    },

    async save(payload: { themeColor?: string; collectionBgColor?: string }) {
        const response = await axios.put(SETTINGS_URL, payload);
        return response.data;
    }
};
