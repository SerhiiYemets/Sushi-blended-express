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
              id: '$$p._id',
              name: '$$p.name',
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
