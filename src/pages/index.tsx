import type { NextPage } from 'next';
import Layout from '../components/Layout';
import Select from '../components/Select';
import Stat from '../components/Stat';

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
        <div className="mt-8 flex items-start justify-between">
          <section className="space-y-8">
            <Select title="Area" options={selectOptions} />
            <Stat
              title="Waktu"
              primary="15 Maret 2022"
              secondary="09:14:57"
              variant="main"
            />
            <Stat
              title="Data terakhir"
              primary="15 Maret 2022"
              secondary="06:00:00"
              variant="main"
            />
          </section>
          <section className="grid grid-cols-3 gap-x-8">
            <h3 className="col-span-3 mb-2.5 text-lg font-semibold">
              Hari ini
            </h3>
            <Stat
              title="Total"
              primary="Rp114.050,00"
              secondary="116,92 kWh"
              variant="aside"
            />
            <Stat
              title="Rata-rata"
              primary="Rp16.293,00"
              secondary="16,7 kWh"
              variant="aside"
              unit="jam"
            />
            <h3 className="col-span-3 mt-8 mb-2.5 text-lg font-semibold">
              Bulan lalu
            </h3>
            <Stat
              title="Total"
              primary="Rp12.353.475,00"
              secondary="11.348,68 kWh"
              variant="aside"
            />
            <Stat
              title="Rata-rata per hari"
              primary="Rp441.196,00"
              secondary="405,31 kWh"
              variant="aside"
              unit="hari"
            />
            <Stat
              title="Rata-rata per jam"
              primary="Rp18.383,17"
              secondary="16,89 kWh"
              variant="aside"
              unit="jam"
            />
          </section>
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
