import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import scanRoutes from './routes/scanRoutes.js';
import { connectDB } from './config/db.js';
import { loadEnv } from './config/env.js';

loadEnv();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/scan', scanRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

const port = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(port, () => console.log(`Backend running on ${port}`));
});
