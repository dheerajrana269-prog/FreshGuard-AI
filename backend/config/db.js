import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error(
      'MONGO_URI is not set. Create backend/.env from backend/.env.example and provide a valid MongoDB connection string.'
    );
  }

  await mongoose.connect(uri);
  console.log('MongoDB connected');
};
