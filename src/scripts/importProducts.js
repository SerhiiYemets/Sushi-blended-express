import 'dotenv/config';
import fs from 'fs/promises';

import { connectMongoDB } from '../db/connectMongoDB.js';
import { Product } from '../models/product.js';
import { Category } from '../models/category.js';

await connectMongoDB();

const productsRaw = await fs.readFile('products.json', 'utf-8');
const products = JSON.parse(productsRaw);

await Product.deleteMany({});

const categoriesJsonRaw = await fs.readFile('categories.json', 'utf-8');
const categoriesJson = JSON.parse(categoriesJsonRaw);

const categories = await Category.find();

const nameToMongoId = new Map(
  categories.map((c) => [c.name, c._id])
);

const categoryMap = {};

categoriesJson.forEach((c) => {
  if (nameToMongoId.has(c.name)) {
    categoryMap[c.id] = nameToMongoId.get(c.name);
  }
});

const preparedProducts = products
  .map((product) => ({
    name: product.name,
    description: product.description || '',
    price: product.price,
    weight: product.weight || '',
    image: product.image || null,
    categoryId: categoryMap[product.categoryId],
  }))
  .filter((product) => product.categoryId);

await Product.insertMany(preparedProducts);

console.log(`Imported ${preparedProducts.length} products`);

process.exit();
