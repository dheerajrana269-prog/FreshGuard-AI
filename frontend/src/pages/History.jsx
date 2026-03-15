import { useEffect, useState } from 'react';
import { scanApi } from '../services/api';

export default function History() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await scanApi.history();
      setItems(data.scans);
    };
    load();
  }, []);

  return (
    <section>
      <h1 className="mb-4 text-2xl font-semibold">Scan History</h1>
      <div className="space-y-3">
        {items.map((scan) => (
          <div key={scan._id} className="rounded-xl border bg-white p-4 shadow-sm">
            <p className="font-medium">{scan.fruitType} - {scan.freshnessLabel} ({scan.freshnessScore}%)</p>
            <p className="text-sm text-slate-500">{new Date(scan.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
