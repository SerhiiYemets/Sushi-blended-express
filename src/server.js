import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';

import { connectMongoDB } from './db/connectMongoDB.js';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import productsRouter from './routes/products.js';
import categoriesRouter from './routes/categories.js';
import menuRouter from './routes/menu.js';
import cartRouter from './routes/cart.js';
import authRouter from './routes/auth.js';
import ordersRouter from './routes/orders.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('trust proxy', 1);

const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_DOMAIN,
];

app.use(logger);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
);

const normalizedAllowedOrigins = allowedOrigins
  .filter(Boolean)
  .map((o) => o.replace(/\/$/, ''));

const vercelPreviewRegex = /^https:\/\/sushi-blended-express-frontend.*\.vercel\.app$/;

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);

    const normalized = origin.replace(/\/$/, '');

    if (normalizedAllowedOrigins.includes(normalized)) {
      return callback(null, true);
    }

    if (vercelPreviewRegex.test(normalized)) {
      return callback(null, true);
    }

    return callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/menu', menuRouter);
app.use('/api/cart', cartRouter);
app.use('/api/auth', authRouter);
app.use('/api/orders', ordersRouter);

app.use(errors());

app.use(notFoundHandler);

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
