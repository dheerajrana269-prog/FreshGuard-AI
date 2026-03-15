export default function ResultCard({ data }) {
  if (!data) return null;
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold">{data.fruitType}</h2>
      <p className="mt-2 text-sm text-slate-500">Freshness Label: <span className="font-medium text-slate-900">{data.freshnessLabel}</span></p>
      <div className="mt-4">
        <div className="mb-1 flex justify-between text-sm">
          <span>Freshness Score</span>
          <span>{data.freshnessScore}%</span>
        </div>
        <div className="h-2 rounded bg-slate-200">
          <div className="h-2 rounded bg-emerald-500" style={{ width: `${data.freshnessScore}%` }} />
        </div>
      </div>
      <ul className="mt-4 space-y-1 text-sm">
        <li><strong>Shelf Life:</strong> {data.shelfLife}</li>
        <li><strong>Defects:</strong> {data.defects?.join(', ') || 'None'}</li>
      </ul>
    </div>
  );
}
