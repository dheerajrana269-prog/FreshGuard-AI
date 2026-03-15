import { connectDB } from '../config/db.js';
import Fruit from '../models/Fruit.js';
import { loadEnv } from '../config/env.js';

loadEnv();

const data = [
  {
    name: 'Tomato',
    nutrition: '18 kcal per 100g, high water content',
    vitamins: 'Vitamin C, K, folate',
    storageTips: 'Store at room temperature away from sunlight',
    averageShelfLife: '3-7 days',
  },
  {
    name: 'Banana',
    nutrition: '89 kcal per 100g, rich in potassium',
    vitamins: 'Vitamin B6, C',
    storageTips: 'Keep at room temperature, separate to slow ripening',
    averageShelfLife: '2-6 days',
  },
  {
    name: 'Apple',
    nutrition: '52 kcal per 100g, fiber rich',
    vitamins: 'Vitamin C, antioxidants',
    storageTips: 'Refrigerate for longer freshness',
    averageShelfLife: '2-4 weeks',
  },
];

const seed = async () => {
  await connectDB();
  await Fruit.deleteMany({});
  await Fruit.insertMany(data);
  console.log('Fruit info seeded');
  process.exit(0);
};

seed();