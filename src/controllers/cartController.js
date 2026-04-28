import mongoose from 'mongoose';
import { Cart } from '../models/cart.js';
import { Product } from '../models/product.js';
import createHttpError from 'http-errors';

const formatCart = (cart) => {
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

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id })
      .populate('items.productId');

    res.json(formatCart(cart));
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw createHttpError(400, 'Invalid productId');
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      throw createHttpError(400, 'Quantity must be a positive integer');
    }

    const product = await Product.findById(productId);
    if (!product) {
      throw createHttpError(404, 'Product not found');
    }

    let cart = await Cart.findOneAndUpdate(
      { userId: req.user._id, 'items.productId': productId },
      { $inc: { 'items.$.quantity': quantity } },
      { new: true }
    ).populate('items.productId');

    if (!cart) {
      cart = await Cart.findOneAndUpdate(
        { userId: req.user._id },
        { $push: { items: { productId, quantity } } },
        { upsert: true, new: true }
      ).populate('items.productId');
    }

    res.json(formatCart(cart));
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw createHttpError(400, 'Invalid productId');
    }

    const cart = await Cart.findOneAndUpdate(
      { userId: req.user._id },
      { $pull: { items: { productId } } },
      { new: true }
    ).populate('items.productId');

    if (!cart) {
      throw createHttpError(404, 'Cart not found');
    }

    res.json(formatCart(cart));
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user._id },
      { $set: { items: [] } },
      { new: true }
    );

    if (!cart) {
      return res.json({ items: [], totalPrice: 0 });
    }

    res.json({ items: [], totalPrice: 0 });
  } catch (error) {
    next(error);
  }
};

