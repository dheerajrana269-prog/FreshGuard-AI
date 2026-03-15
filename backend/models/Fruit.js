import mongoose from 'mongoose';

const fruitSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    nutrition: { type: String, required: true },
    vitamins: { type: String, required: true },
    storageTips: { type: String, required: true },
    averageShelfLife: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Fruit', fruitSchema);
