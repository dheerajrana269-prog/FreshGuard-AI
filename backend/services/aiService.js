import axios from 'axios';
import FormData from 'form-data';

export const analyzeImage = async (buffer) => {
  const form = new FormData();
  form.append('file', buffer, { filename: 'scan.jpg', contentType: 'image/jpeg' });

  const { data } = await axios.post(process.env.AI_SERVICE_URL, form, {
    headers: form.getHeaders(),
    maxBodyLength: Infinity,
  });
  return data;
};
