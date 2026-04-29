import express from 'express';
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} from '../controllers/cartController.js';

import { authenticate } from '../middleware/auth.js';

import { celebrate } from 'celebrate';
import {
  addToCartSchema,
  productIdParamSchema,
} from '../validations/cartValidation.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getCart);
router.post('/', celebrate(addToCartSchema), addToCart);
router.delete('/:productId', celebrate(productIdParamSchema), removeFromCart);
router.delete('/', clearCart);

export default router;
