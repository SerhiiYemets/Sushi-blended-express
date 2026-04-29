import { User } from '../models/user.js';
import createHttpError from 'http-errors';

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user || user.role !== 'admin') {
    throw createHttpError(403, 'Forbidden');
  }

  next();
};
