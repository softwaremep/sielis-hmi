import type { NextPage } from 'next';
import { useState } from 'react';
import { useQuery } from 'react-query';
import DatePicker from '../components/DatePicker';
import Layout from '../components/Layout';
import Select from '../components/Select';
import Stat from '../components/Stat';
import {
  fetchMonthlyData,
  parseDisplayMonthlyData,
  parseRawMonthlyData,
} from '../lib/monthly';
import { areaSelectOptions } from '../lib/utils';

const Monthly: NextPage = () => {
  const [meterId, setMeterId] = useState('default');
  const [date, setDate] = useState<Date | null>(null);
  const { status, data: rawData } = useQuery(
    ['monthly', meterId, date],
    () => fetchMonthlyData(meterId, date!),
    {
      enabled: meterId !== 'default' && !!date,
      refetchInterval: Number(process.env.NEXT_PUBLIC_REFETCH_INTERVAL),
      refetchOnWindowFocus: false,
    }
  );
  const data = rawData ? parseRawMonthlyData(rawData) : undefined;
  const displayData = data ? parseDisplayMonthlyData(data) : undefined;

  return (
    <Layout title="Bulanan">
      <section>
        <h2 className="text-xl font-bold">Konsumsi Energi Listrik Bulanan</h2>
        <div className="mt-8 flex flex-col items-start gap-8 sm:flex-row lg:gap-0">
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
          <section className="lg:mx-auto">
            {status === 'success' && (
              <>
                <div className="grid grid-cols-1 gap-y-2.5 gap-x-8 md:grid-cols-2 lg:grid-cols-[auto_auto]">
                  <h3 className="text-lg font-semibold md:col-span-2 lg:col-span-3">
                    Bulanan
                  </h3>
                  <Stat
                    title="Total"
                    primary={displayData!.month.totalCost}
                    secondary={displayData!.month.totalPower}
                    variant="aside"
                  />
                  <Stat
                    title="Rata-rata"
                    primary={displayData!.month.averageCost}
                    secondary={displayData!.month.averagePower}
                    variant="aside"
                    unit="hari"
                  />
                </div>
              </>
            )}
          </section>
        </div>
      </section>
    </Layout>
  );
};

export default Monthly;
