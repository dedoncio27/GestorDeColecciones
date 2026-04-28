import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as collectionService from '../_utils/collectionService';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const collections = await collectionService.getCollections();
      res.status(200).json(collections);
    } else if (req.method === 'POST') {
      const collection = await collectionService.saveCollection(req.body);
      res.status(201).json(collection);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}