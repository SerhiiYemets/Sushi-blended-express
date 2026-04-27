import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: '',
    },

    price: {
      type: Number,
      required: true,
    },

    weight: {
      type: String,
      default: '',
    },

    image: {
      type: String,
      default: null,
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Product = model('Product', productSchema);
