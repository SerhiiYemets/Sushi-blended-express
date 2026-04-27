import { Product } from '../models/product.js';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

export const getAllProducts = async (req, res) => {
  const { categoryId } = req.query;

  const filter = categoryId
    ? { categoryId: new mongoose.Types.ObjectId(categoryId) }
    : {};

  const products = await Product.find(filter).populate('categoryId');

  res.status(200).json(products);
};

export const getProductById = async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId).populate('categoryId');

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json(product);
};

export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

export const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findOneAndDelete({
    _id: productId,
  });

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json(product);
};

export const updateProduct = async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findByIdAndUpdate(
    productId,
    req.body,
    { returnDocument: 'after' },
  );

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json(product);
};


