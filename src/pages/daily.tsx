import { useState } from 'react';
import { useQuery } from 'react-query';
import DatePicker from '../components/DatePicker';
import Layout from '../components/Layout';
import Select from '../components/Select';
import {
  fetchDailyData,
  parseDisplayDailyData,
  parseRawDailyData,
} from '../lib/daily';
import { areaSelectOptions } from '../lib/utils';

function Daily() {
  const [meterId, setMeterId] = useState('default');
  const [date, setDate] = useState<Date | null>(null);
  const { status, data: rawData } = useQuery(
    ['now', meterId],
    () => fetchDailyData(meterId),
    {
      enabled: meterId !== 'default',
      refetchInterval: Number(process.env.NEXT_PUBLIC_REFETCH_INTERVAL),
      refetchOnWindowFocus: false,
    }
  );
  const data = rawData ? parseRawDailyData(rawData) : undefined;
  const displayData = data ? parseDisplayDailyData(data) : undefined;

  return (
    <Layout title="Harian">
      <section>
        <h2 className="text-xl font-bold">Konsumsi Energi Listrik Harian</h2>
        <div className="mt-8 flex flex-col items-start justify-between gap-8 sm:flex-row">
          <section className="space-y-8">
            <Select
              title="Area"
              placeholder="Pilih area"
              options={areaSelectOptions}
              value={meterId}
              onChange={e => setMeterId(e.target.value)}
            />
            <DatePicker
              title="Tanggal"
              placeholder="Pilih tanggal"
              date={date}
              onChange={date => setDate(date)}
            />
            {status === 'loading' && (
              <p className="font-medium text-blue-900">Loading...</p>
            )}
            {status === 'error' && (
              <p className="font-medium text-red-500">
                Data tidak dapat terambil
              </p>
            )}
          </section>
        </div>
      </section>
    </Layout>
  );
}
export default Daily;
