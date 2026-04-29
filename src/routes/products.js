import express from 'express';
import { celebrate } from 'celebrate';

import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productsController.js';

import { authenticate } from '../middleware/auth.js';
import { isAdmin } from '../middleware/isAdmin.js';

import {
  createProductSchema,
  updateProductSchema,
} from '../validations/productValidation.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:productId', getProductById);

router.post('/', authenticate, isAdmin, celebrate(createProductSchema), createProduct);
router.patch('/:productId', authenticate, isAdmin, celebrate(updateProductSchema), updateProduct);
router.delete('/:productId', authenticate, isAdmin, deleteProduct);

export default router;
