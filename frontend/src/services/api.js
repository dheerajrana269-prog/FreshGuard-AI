import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('fg_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  register: (payload) => api.post('/auth/register', payload),
  login: (payload) => api.post('/auth/login', payload),
};

export const scanApi = {
  scan: (formData) => api.post('/scan', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  history: () => api.get('/scan/history'),
};

export default api;
