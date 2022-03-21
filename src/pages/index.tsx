import type { NextPage } from 'next';
import Layout from '../components/Layout';
import Select from '../components/Select';

// Area options
const selectOptions = [
  { value: 133, label: 'Labtek 5' },
  { value: 135, label: 'Labtek 6' },
  { value: 136, label: 'Labtek 7' },
  { value: 138, label: 'Labtek 8' },
  { value: 163, label: 'SBM' },
  { value: 173, label: 'CRCS' },
  { value: 174, label: 'CAS' },
  { value: 175, label: 'CADL' },
  { value: 176, label: 'CIBE' },
];

const Home: NextPage = () => {
  return (
    <Layout>
      <section>
        <h2 className="text-xl font-bold">Total Konsumsi Energi Listrik</h2>
        <div className="mt-8 space-y-8">
          <Select title="Area" options={selectOptions} />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-xl font-bold">
          Konsumsi Daya Listrik (kW) 1 Jam Terakhir
        </h2>
      </section>
    </Layout>
  );
};

export default Home;
