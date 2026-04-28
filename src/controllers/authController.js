import { User } from '../models/user.js';
import { Session } from '../models/session.js';
import createHttpError from 'http-errors';
import crypto, { createHash } from 'crypto';

const hashToken = (token) =>
  createHash('sha256').update(token).digest('hex');

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
};

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
    if (!user) throw createHttpError(401, 'Invalid credentials');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw createHttpError(401, 'Invalid credentials');

    const accessToken = crypto.randomBytes(32).toString('hex');
    const refreshToken = crypto.randomBytes(32).toString('hex');

    await Session.create({
      userId: user._id,
      accessToken: hashToken(accessToken),
      refreshToken: hashToken(refreshToken),
      accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
      refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    res.cookie('accessToken', accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

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

    const session = await Session.findOne({
      refreshToken: hashToken(refreshToken),
    });

    if (!session) {
      throw createHttpError(401, 'Session not found');
    }

    if (new Date() > new Date(session.refreshTokenValidUntil)) {
      throw createHttpError(401, 'Refresh token expired');
    }

    const newAccessToken = crypto.randomBytes(32).toString('hex');

    session.accessToken = hashToken(newAccessToken);
    session.accessTokenValidUntil = new Date(
      Date.now() + 15 * 60 * 1000
    );

    await session.save();

    res.cookie('accessToken', newAccessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 15 * 60 * 1000,
    });

    res.json({ message: 'Token refreshed' });

  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = req.cookies;

    if (refreshToken) {
      await Session.findOneAndDelete({
        refreshToken: hashToken(refreshToken),
      });
    } else if (accessToken) {
      await Session.findOneAndDelete({
        accessToken: hashToken(accessToken),
      });
    }

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.json({ message: 'Logged out successfully' });

  } catch (error) {
    next(error);
  }
};

