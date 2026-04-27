import express from 'express';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory,
} from '../controllers/categoriesController.js';

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:categoryId', getCategoryById);
router.post('/', createCategory);
router.delete('/:categoryId', deleteCategory);
router.patch('/:categoryId', updateCategory);

export default router;
