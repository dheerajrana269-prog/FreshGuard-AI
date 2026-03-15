import Scan from '../models/Scan.js';
import Fruit from '../models/Fruit.js';
import { uploadImageBuffer } from '../services/cloudinaryService.js';
import { analyzeImage } from '../services/aiService.js';

export const createScan = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Image file required' });

  const imageUrl = await uploadImageBuffer(req.file.buffer);
  const ai = await analyzeImage(req.file.buffer);
  const fruitInfo = await Fruit.findOne({ name: new RegExp(`^${ai.fruit}$`, 'i') }).lean();

  const scan = await Scan.create({
    userId: req.user.id,
    imageUrl,
    fruitType: ai.fruit,
    freshnessScore: ai.freshnessScore,
    freshnessLabel: ai.freshnessLabel,
    shelfLife: ai.shelfLife,
    defects: ai.defects,
    fruitInfo: fruitInfo
      ? {
          nutrition: fruitInfo.nutrition,
          vitamins: fruitInfo.vitamins,
          storageTips: fruitInfo.storageTips,
          averageShelfLife: fruitInfo.averageShelfLife,
        }
      : undefined,
  });

  res.status(201).json({ scan });
};

export const getHistory = async (req, res) => {
  const scans = await Scan.find({ userId: req.user.id }).sort({ createdAt: -1 }).lean();
  res.json({ scans });
};
