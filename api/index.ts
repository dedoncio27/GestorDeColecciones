import type { VercelRequest, VercelResponse } from '@vercel/node';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Importar dinámicamente para que funcione en Vercel
    const { default: express } = await import('express');
    const { default: cors } = await import('cors');
    
    // Importar rutas del servidor
    const serverModule = await import(path.join(__dirname, '../server/src/index.ts'));
    
    res.status(200).json({ 
      message: 'API Gateway funcionando',
      environment: process.env.NODE_ENV 
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
