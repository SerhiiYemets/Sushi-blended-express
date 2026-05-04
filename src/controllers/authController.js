import { User } from '../models/user.js';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';

import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';

import { sendEmail } from '../services/emailService.js';

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

// LOGIN
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

export const requestResetEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({
        message: 'If this email exists, a reset link has been sent',
      });
    }

    const resetToken = jwt.sign(
      { sub: user._id, email },
      process.env.JWT_SECRET,
      { expiresIn: '15m' },
    );

    const templatePath = path.resolve('src/templates/reset-password-email.html');
    const templateSource = await fs.readFile(templatePath, 'utf-8');

    const template = handlebars.compile(templateSource);

    const html = template({
      name: user.name,
      link: `${process.env.FRONTEND_DOMAIN}/reset-password?token=${resetToken}`,
    });

    await sendEmail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Reset your password',
      html,
    });

    res.status(200).json({
      message: 'If this email exists, a reset link has been sent',
    });
  } catch (error) {
    next(error);
  }
};
