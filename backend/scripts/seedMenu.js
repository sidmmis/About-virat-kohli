import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MessMenu from '../src/models/MessMenu.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dormease';

const data = [
  { day: 'Monday', breakfast: 'Poha & Tea', lunch: 'Dal, Rice, Roti', dinner: 'Paneer Curry, Roti' },
  { day: 'Tuesday', breakfast: 'Upma & Tea', lunch: 'Rajma, Rice, Salad', dinner: 'Egg Curry, Rice' },
  { day: 'Wednesday', breakfast: 'Idli & Sambar', lunch: 'Chole, Rice, Roti', dinner: 'Veg Pulao, Raita' },
  { day: 'Thursday', breakfast: 'Paratha & Curd', lunch: 'Mixed Veg, Rice', dinner: 'Chicken Curry, Roti' },
  { day: 'Friday', breakfast: 'Sandwich & Milk', lunch: 'Kadhi, Rice', dinner: 'Fish Fry, Rice' },
  { day: 'Saturday', breakfast: 'Dosa & Chutney', lunch: 'Aloo Gobi, Roti', dinner: 'Biryani, Raita' },
  { day: 'Sunday', breakfast: 'Poori Bhaji', lunch: 'Pulao, Dal', dinner: 'Pasta, Garlic Bread' },
];

async function run() {
  try {
    await mongoose.connect(MONGO_URI);
    await MessMenu.deleteMany({});
    await MessMenu.insertMany(data);
    console.log('Seeded mess menu');
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
  }
}

run();

