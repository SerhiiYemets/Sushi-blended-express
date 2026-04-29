import { Joi, Segments } from 'celebrate';

const objectId = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .messages({
    'string.pattern.base': 'Invalid id format',
  });

export const addToCartSchema = {
  [Segments.BODY]: Joi.object({
    productId: objectId.required(),

    quantity: Joi.number().integer().min(1).default(1).messages({
      'number.base': 'Quantity must be a number',
      'number.min': 'Quantity must be at least 1',
    }),
  }).unknown(false),
};

export const productIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    productId: objectId.required(),
  }),
};
