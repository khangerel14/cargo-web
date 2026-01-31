import express from 'express';
import userRoutes from './routes/userRoutes';
import connectDB from './config/db';
import productRoutes from './routes/productRoutes';
import cors from 'cors';
import authRouter from './routes/auth.router';
import './jobs/cleaner';
import Product from './models/Product';

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  ...(process.env.FRONTEND_URL?.split(',').map((u: string) => u.trim()).filter(Boolean) ?? []),
  ...(process.env.BACKEND_URL ? [process.env.BACKEND_URL] : []),
];

// Allow Vercel/Render deployment origins (e.g. https://*.vercel.app, https://*.onrender.com)
const isAllowedDeploymentOrigin = (origin: string) =>
  /^https:\/\/([a-z0-9-]+\.)*vercel\.app$/i.test(origin) ||
  /^https:\/\/([a-z0-9-]+\.)*onrender\.com$/i.test(origin);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. Postman, curl, same-origin)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      if (isAllowedDeploymentOrigin(origin)) return callback(null, true);
      callback(null, false);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

connectDB();

app.use(express.json());

app.get('/test-delete', async (req, res) => {
  const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);

  try {
    const result = await Product.deleteMany({
      status: 'handed_over',
      updatedAt: { $lt: tenDaysAgo },
    });

    res.json({ deleted: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the Cargo-Web API!');
});

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT ?? 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
