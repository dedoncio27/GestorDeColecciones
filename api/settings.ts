import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as collectionService from './utils/collectionService.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const settings = await collectionService.getSettings();
      res.status(200).json(settings);
    } else if (req.method === 'PUT') {
      const { themeColor, collectionBgColor } = req.body;
      const settings = await collectionService.saveSettings({ themeColor, collectionBgColor });
      res.status(200).json(settings);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Settings API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
