import crypto from 'crypto';
import { Session } from '../models/session.js';
import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constants/time.js';
import { hashToken } from '../utils/hashToken.js';

const isProduction = process.env.NODE_ENV === 'production';

export const createSession = async (userId) => {
  const accessToken = crypto.randomBytes(32).toString('hex');
  const refreshToken = crypto.randomBytes(32).toString('hex');

  const session = await Session.create({
    userId,
    accessToken: hashToken(accessToken),
    refreshToken: hashToken(refreshToken),
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });

  return {
    session,
    accessToken,
    refreshToken,
  };
};

export const refreshSession = async (refreshToken) => {
  if (!refreshToken) return null;

  const session = await Session.findOne({
    refreshToken: hashToken(refreshToken),
  });

  if (!session) return null;

  if (new Date() > session.refreshTokenValidUntil) {
    return null;
  }

  const newAccessToken = crypto.randomBytes(32).toString('hex');
  const newRefreshToken = crypto.randomBytes(32).toString('hex');

  session.accessToken = hashToken(newAccessToken);
  session.refreshToken = hashToken(newRefreshToken);
  session.accessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES);
  session.refreshTokenValidUntil = new Date(Date.now() + THIRTY_DAYS);

  await session.save();

  return {
    session,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

export const deleteSession = async (accessToken, refreshToken) => {
  if (refreshToken) {
    return Session.findOneAndDelete({
      refreshToken: hashToken(refreshToken),
    });
  }

  if (accessToken) {
    return Session.findOneAndDelete({
      accessToken: hashToken(accessToken),
    });
  }

  return null;
};

export const setSessionCookies = (res, accessToken, refreshToken) => {
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
  };

  res.cookie('accessToken', accessToken, {
    ...cookieOptions,
    maxAge: FIFTEEN_MINUTES,
  });

  res.cookie('refreshToken', refreshToken, {
    ...cookieOptions,
    maxAge: THIRTY_DAYS,
  });
};

export const clearSessionCookies = (res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
  };

  res.clearCookie('accessToken', cookieOptions);
  res.clearCookie('refreshToken', cookieOptions);
};

