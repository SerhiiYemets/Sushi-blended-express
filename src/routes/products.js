import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/productsController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:productId', getProductById);
router.post('/', createProduct);
router.delete('/:productId', deleteProduct);
router.patch('/:productId', updateProduct);

export default router;
