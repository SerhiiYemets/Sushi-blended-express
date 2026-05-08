import { Joi, Segments } from 'celebrate';

const objectId = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .messages({
    'string.pattern.base': 'Invalid id format',
  });

export const createOrderSchema = {
  [Segments.BODY]: Joi.object({
    customer: Joi.object({
      firstName: Joi.string()
        .min(2)
        .max(32)
        .required(),

      lastName: Joi.string()
        .min(2)
        .max(32)
        .required(),

      phone: Joi.string()
        .min(6)
        .max(20)
        .required(),

      email: Joi.string()
        .email()
        .allow('')
        .optional(),
    }).required(),

    deliveryType: Joi.string()
      .valid('delivery', 'pickup')
      .required(),

    address: Joi.string()
      .allow('')
      .optional(),

    peopleCount: Joi.number()
      .min(1)
      .max(50)
      .required(),

    notes: Joi.string()
      .allow('')
      .max(500)
      .optional(),

    paymentMethod: Joi.string()
      .valid('cash', 'card')
      .required(),

    items: Joi.array()
      .items(
        Joi.object({
          productId: objectId.required(),

          name: Joi.string()
            .required(),

          quantity: Joi.number()
            .min(1)
            .required(),

          price: Joi.number()
            .min(0)
            .required(),
        })
      )
      .min(1)
      .required(),

    subtotal: Joi.number()
      .min(0)
      .required(),

    deliveryFee: Joi.number()
      .min(0)
      .required(),

    totalPrice: Joi.number()
      .min(0)
      .required(),
  }).unknown(false),
};


