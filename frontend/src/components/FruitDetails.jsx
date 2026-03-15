export default function FruitDetails({ result }) {
  if (!result?.fruitInfo) return null;
  return (
    <div className="mt-4 rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold">Nutrition & Storage</h3>
      <p className="mt-2 text-sm"><strong>Nutrition:</strong> {result.fruitInfo.nutrition}</p>
      <p className="text-sm"><strong>Vitamins:</strong> {result.fruitInfo.vitamins}</p>
      <p className="text-sm"><strong>Storage Tips:</strong> {result.fruitInfo.storageTips}</p>
      <p className="text-sm"><strong>Average Shelf Life:</strong> {result.fruitInfo.averageShelfLife}</p>
    </div>
  );
}
