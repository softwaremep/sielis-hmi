import { useState } from 'react';
import { useQuery } from 'react-query';
import DatePicker from '../components/DatePicker';
import Layout from '../components/Layout';
import Message from '../components/Message';
import Select from '../components/Select';
import Stat from '../components/Stat';
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
    ['daily', meterId, date],
    () => fetchDailyData(meterId, date!),
    {
      enabled: meterId !== 'default' && !!date,
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
          <section className="grid grid-cols-1 gap-y-2.5 gap-x-8 md:grid-cols-2 lg:grid-cols-3">
            {status === 'success' && (
              <>
                <h3 className="text-lg font-semibold md:col-span-2 lg:col-span-3">
                  Hari ini
                </h3>
                <Stat
                  title="Total"
                  primary={displayData!.today.totalCost}
                  secondary={displayData!.today.totalPower}
                  variant="aside"
                />
                <Stat
                  title="Rata-rata"
                  primary={displayData!.today.averageCost}
                  secondary={displayData!.today.averagePower}
                  variant="aside"
                  unit="jam"
                />
                <h3 className="mt-6 text-lg font-semibold md:col-span-2 lg:col-span-3">
                  Bulan lalu
                </h3>
                <Stat
                  title="Total"
                  primary={displayData!.prevMonth.totalCost}
                  secondary={displayData!.prevMonth.totalPower}
                  variant="aside"
                />
                <Stat
                  title="Rata-rata per hari"
                  primary={displayData!.prevMonth.averageCost}
                  secondary={displayData!.prevMonth.averagePower}
                  variant="aside"
                  unit="hari"
                />
                <Message
                  type={
                    data!.today.averageCost < data!.prevMonth.averageCost
                      ? 'positive'
                      : 'negative'
                  }
                  className="mt-8 md:col-span-2"
                />
              </>
            )}
          </section>
        </div>
      </section>
    </Layout>
  );
}
export default Daily;
