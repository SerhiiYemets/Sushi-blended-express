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

app.use(helmet());

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);

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
