import { Category } from '../models/category.js';

export const getMenu = async (req, res) => {
  const menu = await Category.aggregate([
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: 'categoryId',
        as: 'products',
      },
    },

    {
      $match: {
        products: { $ne: [] },
      },
    },

    {
      $project: {
        _id: 0,
        category: '$name',
        products: {
          $map: {
            input: '$products',
            as: 'p',
            in: {
              _id: '$$p._id',
              categoryId: '$$p.categoryId',
              name: '$$p.name',
              description: '$$p.description',
              price: '$$p.price',
              weight: '$$p.weight',
              image: '$$p.image',
            },
          },
        },
      },
    },
  ]);

  res.json(menu);
};
