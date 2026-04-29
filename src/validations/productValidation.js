import { Joi, Segments } from 'celebrate';

const objectId = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .messages({
    'string.pattern.base': 'Invalid id format',
  });

export const createProductSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(128).required(),
    description: Joi.string().allow('').optional(),
    price: Joi.number().min(0).required(),
    weight: Joi.string().allow('').optional(),
    image: Joi.string().uri().allow(null, ''),
    categoryId: objectId.required(),
  }).unknown(false),
};

export const updateProductSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(128),
    description: Joi.string().allow(''),
    price: Joi.number().min(0),
    weight: Joi.string().allow(''),
    image: Joi.string().uri().allow(null, ''),
    categoryId: objectId,
  }).min(1),
};
