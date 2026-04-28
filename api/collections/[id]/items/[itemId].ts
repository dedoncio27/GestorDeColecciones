import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as collectionService from '../../../_utils/collectionService';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id, itemId } = req.query;
  if (typeof id !== 'string' || typeof itemId !== 'string') {
    return res.status(400).json({ error: 'Invalid IDs' });
  }

  try {
    if (req.method === 'PUT') {
      const item = await collectionService.updateItemInCollection(id, itemId, req.body);
      res.status(200).json(item);
    } else if (req.method === 'DELETE') {
      await collectionService.deleteItemFromCollection(id, itemId);
      res.status(204).end();
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}