import { Joi, Segments } from 'celebrate';

export const createCategorySchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    image: Joi.string().uri().required(),
  }).unknown(false),
};

export const updateCategorySchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(100),
    image: Joi.string().uri(),
  }).min(1),
};
