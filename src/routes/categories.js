import express from 'express';
import { celebrate } from 'celebrate';

import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoriesController.js';

import { authenticate } from '../middleware/auth.js';
import { isAdmin } from '../middleware/isAdmin.js';

import {
  createCategorySchema,
  updateCategorySchema,
} from '../validations/categoryValidation.js';

const router = express.Router();

router.get('/', getAllCategories);

router.post('/', authenticate, isAdmin, celebrate(createCategorySchema), createCategory);
router.patch('/:categoryId', authenticate, isAdmin, celebrate(updateCategorySchema), updateCategory);
router.delete('/:categoryId', authenticate, isAdmin, deleteCategory);

export default router;
