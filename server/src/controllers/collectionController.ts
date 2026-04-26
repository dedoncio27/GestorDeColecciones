import { Request, Response } from 'express';
import * as collectionService from '../services/collectionService';

export const getAll = (req: Request, res: Response) => {
    try {
        const collections = collectionService.getCollections();
        res.json(collections);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener colecciones' });
    }
};

export const create = (req: Request, res: Response) => {
    try {
        const collection = collectionService.saveCollection(req.body);
        res.status(201).json(collection);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la colección' });
    }
};

export const remove = (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (typeof id === 'string') {
            collectionService.deleteCollection(id);
            res.status(204).send();
        } else {
            res.status(400).json({ error: 'ID inválido' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la colección' });
    }
};

// --- GESTIÓN DE ITEMS ---

export const addItem = (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (typeof id === 'string') {
            const item = collectionService.addItemToCollection(id, req.body);
            res.status(201).json(item);
        } else {
            res.status(400).json({ error: 'ID de colección inválido' });
        }
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ error: 'Error al añadir el elemento' });
    }
};

export const updateItem = (req: Request, res: Response) => {
    try {
        const { id, itemId } = req.params;
        if (typeof id === 'string' && typeof itemId === 'string') {
            const item = collectionService.updateItemInCollection(id, itemId, req.body);
            res.json(item);
        } else {
            res.status(400).json({ error: 'IDs inválidos' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el elemento' });
    }
};

export const removeItem = (req: Request, res: Response) => {
    try {
        const { id, itemId } = req.params;
        if (typeof id === 'string' && typeof itemId === 'string') {
            collectionService.deleteItemFromCollection(id, itemId);
            res.status(204).send();
        } else {
            res.status(400).json({ error: 'IDs inválidos' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el elemento' });
    }
};
