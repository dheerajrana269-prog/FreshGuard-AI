import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../services/api';
import { setCredentials } from '../store/slices/authSlice';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await authApi.login(form);
      dispatch(setCredentials(data));
      navigate('/scan');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={submit} className="mx-auto max-w-md space-y-3 rounded-xl bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">Login</h1>
      <input className="w-full rounded border p-2" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="w-full rounded border p-2" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button className="w-full rounded bg-emerald-600 py-2 text-white">Login</button>
    </form>
  );
}
