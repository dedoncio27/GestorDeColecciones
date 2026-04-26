import express from 'express';
import * as collectionController from '../controllers/collectionController';

const router = express.Router();

router.get('/', collectionController.getAll);
router.post('/', collectionController.create);
router.delete('/:id', collectionController.remove);

// Rutas para elementos (items)
router.post('/:id/items', collectionController.addItem);
router.put('/:id/items/:itemId', collectionController.updateItem);
router.delete('/:id/items/:itemId', collectionController.removeItem);

export default router;
