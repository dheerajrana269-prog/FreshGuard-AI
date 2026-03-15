import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImageBuffer = async (buffer) => {
  const b64 = `data:image/jpeg;base64,${buffer.toString('base64')}`;
  const result = await cloudinary.uploader.upload(b64, { folder: 'freshguard' });
  return result.secure_url;
};
