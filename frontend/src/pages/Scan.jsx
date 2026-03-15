import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CameraUpload from '../components/CameraUpload';
import Loader from '../components/Loader';
import { scanApi } from '../services/api';
import { setLatestResult } from '../store/slices/scanSlice';

export default function Scan() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const { data } = await scanApi.scan(formData);
      dispatch(setLatestResult(data.scan));
      navigate('/result');
    } catch (error) {
      alert(error.response?.data?.message || 'Scan failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Scan Fruit or Vegetable</h1>
      <CameraUpload onImageReady={setFile} />
      <button onClick={onAnalyze} disabled={!file || loading} className="rounded bg-emerald-600 px-4 py-2 text-white disabled:bg-slate-300">Analyze</button>
      {loading && <Loader />}
    </section>
  );
}
