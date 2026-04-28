import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import cors from 'cors';
import collectionRoutes from '../server/src/routes/collectionRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/collections', collectionRoutes);

export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res);
}
