import { Category } from '../models/category.js';
import createHttpError from 'http-errors';

export const getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
};

export const getCategoryById = async (req, res) => {
  const { categoryId } = req.params;

  const category = await Category.findById(categoryId);

  if (!category) {
    throw createHttpError(404, 'Category not found');
  }

  res.status(200).json(category);
};

export const createCategory = async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json(category);
};

export const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  const category = await Category.findByIdAndDelete(categoryId);

  if (!category) {
    throw createHttpError(404, 'Category not found');
  }

  res.status(200).json(category);
};

export const updateCategory = async (req, res) => {
  const { categoryId } = req.params;

  const category = await Category.findByIdAndUpdate(
    categoryId,
    req.body,
    { returnDocument: 'after' }
  );

  if (!category) {
    throw createHttpError(404, 'Category not found');
  }

  res.status(200).json(category);
};
