import {
  getUserCart,
  addProductToCart,
  removeProductFromCart,
  clearUserCart,
} from '../services/cartService.js';

export const getCart = async (req, res, next) => {
  try {
    const cart = await getUserCart(req.user._id);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const cart = await addProductToCart(
      req.user._id,
      req.body.productId,
      req.body.quantity
    );

    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const cart = await removeProductFromCart(
      req.user._id,
      req.params.productId
    );

    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const cart = await clearUserCart(req.user._id);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

