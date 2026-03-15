import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="rounded-2xl bg-white p-10 shadow-sm">
      <h1 className="text-4xl font-bold text-emerald-600">FreshGuard AI</h1>
      <p className="mt-4 max-w-2xl text-slate-600">Analyze fruit and vegetable freshness using AI. Upload an image, detect produce type, freshness, defects, nutrition, and storage recommendations instantly.</p>
      <Link to="/scan" className="mt-6 inline-block rounded bg-emerald-600 px-5 py-2 text-white">Start Scanning</Link>
    </section>
  );
}
