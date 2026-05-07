import 'dotenv/config';
import fs from 'fs/promises';

import { connectMongoDB } from '../db/connectMongoDB.js';
import { Category } from '../models/category.js';

await connectMongoDB();

const categoriesRaw = await fs.readFile('src/db/categories.json', 'utf-8');
const categories = JSON.parse(categoriesRaw);

await Category.deleteMany({});

await Category.insertMany(categories);

console.log(`Imported ${categories.length} categories`);

process.exit();
