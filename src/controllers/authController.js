import { User } from '../models/user.js';
import createHttpError from 'http-errors';

import {
  createSession,
  refreshSession,
  deleteSession,
  setSessionCookies,
  clearSessionCookies,
} from '../services/sessionService.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createHttpError(409, 'User already exists');
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      id: user._id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw createHttpError(401, 'Invalid credentials');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw createHttpError(401, 'Invalid credentials');
    }

    const { accessToken, refreshToken } = await createSession(user._id);

    setSessionCookies(res, accessToken, refreshToken);

    res.json({ message: 'Logged in successfully' });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw createHttpError(401, 'No refresh token');
    }

    const result = await refreshSession(refreshToken);

    if (!result) {
      throw createHttpError(401, 'Invalid session');
    }

    setSessionCookies(res, result.accessToken, result.refreshToken);

    res.json({ message: 'Token refreshed' });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = req.cookies;

    await deleteSession(accessToken, refreshToken);

    clearSessionCookies(res);

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};
