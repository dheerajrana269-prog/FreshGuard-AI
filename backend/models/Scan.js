import mongoose from 'mongoose';

const scanSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    imageUrl: { type: String, required: true },
    fruitType: { type: String, required: true },
    freshnessScore: { type: Number, required: true },
    freshnessLabel: { type: String, enum: ['Fresh', 'Semi-Fresh', 'Rotten'], required: true },
    shelfLife: { type: String, required: true },
    defects: [{ type: String }],
    fruitInfo: {
      nutrition: String,
      vitamins: String,
      storageTips: String,
      averageShelfLife: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Scan', scanSchema);
