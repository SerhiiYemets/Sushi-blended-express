import express from 'express';
import { celebrate } from 'celebrate';

import { createOrder } from '../controllers/ordersController.js';

import {
  createOrderSchema,
} from '../validations/orderValidation.js';

const router = express.Router();

router.post('/', celebrate(createOrderSchema), createOrder);

export default router;
