import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { hashToken } from '../utils/hashToken.js';

export const authenticate = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      throw createHttpError(401, 'No access token');
    }

    const session = await Session.findOne({
      accessToken: hashToken(accessToken),
    });

    if (!session) {
      throw createHttpError(401, 'Session not found');
    }

    if (new Date() > new Date(session.accessTokenValidUntil)) {
      throw createHttpError(401, 'Access token expired');
    }

    req.user = { _id: session.userId };

    next();
  } catch (error) {
    next(error);
  }
};

