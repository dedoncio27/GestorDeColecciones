import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as collectionService from '../../../utils/collectionService';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid collection ID' });
  }

  try {
    if (req.method === 'POST') {
      const item = await collectionService.addItemToCollection(id, req.body);
      res.status(201).json(item);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}