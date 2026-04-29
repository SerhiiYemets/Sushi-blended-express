import mongoose from 'mongoose';
import createHttpError from 'http-errors';
import { Cart } from '../models/cart.js';
import { Product } from '../models/product.js';

export const formatCart = (cart) => {
  if (!cart) return { items: [], totalPrice: 0 };

  const items = cart.items
    .filter((item) => item.productId)
    .map((item) => {
      const product = item.productId;

      return {
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: item.quantity,
        total: product.price * item.quantity,
      };
    });

  const totalPrice = items.reduce((sum, item) => sum + item.total, 0);

  return { items, totalPrice };
};

export const getUserCart = async (userId) => {
  const cart = await Cart.findOne({ userId })
    .populate('items.productId');

  return formatCart(cart);
};

export const addProductToCart = async (userId, productId, quantity = 1) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw createHttpError(400, 'Invalid productId');
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    throw createHttpError(400, 'Quantity must be a positive integer');
  }

  const product = await Product.findById(productId);
  if (!product) throw createHttpError(404, 'Product not found');

  let cart = await Cart.findOneAndUpdate(
    { userId, 'items.productId': productId },
    { $inc: { 'items.$.quantity': quantity } },
    { new: true }
  ).populate('items.productId');

  if (!cart) {
    cart = await Cart.findOneAndUpdate(
      { userId },
      { $push: { items: { productId, quantity } } },
      { upsert: true, new: true }
    ).populate('items.productId');
  }

  return formatCart(cart);
};

export const removeProductFromCart = async (userId, productId) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw createHttpError(400, 'Invalid productId');
  }

  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $pull: { items: { productId } } },
    { new: true }
  ).populate('items.productId');

  if (!cart) {
    throw createHttpError(404, 'Cart not found');
  }

  return formatCart(cart);
};

export const clearUserCart = async (userId) => {
  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $set: { items: [] } },
    { new: true }
  );

  return formatCart(cart);
};
