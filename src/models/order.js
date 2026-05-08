import { Schema, model } from 'mongoose';

const orderItemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);
const orderSchema = new Schema(
  {
    customer: {
      firstName: {
        type: String,
        required: true,
      },

      lastName: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        default: '',
      },
    },

    deliveryType: {
      type: String,
      enum: ['delivery', 'pickup'],
      required: true,
    },

    address: {
      type: String,
      default: '',
    },

    peopleCount: {
      type: Number,
      default: 1,
    },

    notes: {
      type: String,
      default: '',
    },

    paymentMethod: {
      type: String,
      enum: ['cash', 'card'],
      default: 'cash',
    },

    items: {
      type: [orderItemSchema],
      required: true,
    },

    subtotal: {
      type: Number,
      required: true,
    },

    deliveryFee: {
      type: Number,
      default: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ['new', 'confirmed', 'cooking', 'delivery', 'completed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Order = model('Order', orderSchema);
