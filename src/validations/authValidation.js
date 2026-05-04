import { Joi, Segments } from 'celebrate';

export const registerSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(32).trim().required(),

    email: Joi.string().email().max(64).lowercase().trim().required(),

    password: Joi.string().min(8).max(128).required(),
  }).unknown(false),
};

export const loginSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().lowercase().trim().required(),
    password: Joi.string().required(),
  }).unknown(false),
};

export const requestResetEmailSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
  }).unknown(false),
};
