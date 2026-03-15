import { useSelector } from 'react-redux';
import ResultCard from '../components/ResultCard';
import FruitDetails from '../components/FruitDetails';

export default function Result() {
  const result = useSelector((state) => state.scan.latestResult);

  if (!result) {
    return <p>No scan result yet. Please run a scan.</p>;
  }

  return (
    <section>
      <h1 className="mb-4 text-2xl font-semibold">Latest Analysis</h1>
      <ResultCard data={result} />
      <FruitDetails result={result} />
    </section>
  );
}
