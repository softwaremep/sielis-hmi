import type { NextPage } from 'next';
import { useState } from 'react';
import { useQuery } from 'react-query';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import DatePicker from '../components/DatePicker';
import ExportButton from '../components/ExportButton';
import Layout from '../components/Layout';
import Message from '../components/Message';
import Select from '../components/Select';
import Stat from '../components/Stat';
import Table from '../components/Table';
import {
  dailyTableColumns,
  fetchDailyData,
  getDailyCsvFilename,
  parseDisplayDailyData,
  parseRawDailyData,
} from '../lib/daily';
import area from '../../area.json';

const Daily: NextPage = () => {
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
        <div className="mt-8 flex flex-col items-start gap-8 sm:flex-row lg:gap-0">
          <section className="space-y-8">
            <Select
              title="Area"
              placeholder="Pilih area"
              options={area}
              value={meterId}
              onChange={e => setMeterId(e.target.value)}
            />
            <DatePicker
              title="Tanggal"
              placeholder="Pilih tanggal"
              date={date}
              onChange={date => setDate(date)}
            />
            {status === 'success' && (
              <ExportButton
                data={rawData!.hourly_data}
                filename={getDailyCsvFilename(meterId!, date!)}
              />
            )}
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
                  {displayData!.prevMonth ? (
                    <>
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
                    </>
                  ) : (
                    <p className="text-red-500 md:col-span-2">
                      Data bulan lalu tidak tersedia
                    </p>
                  )}
                </div>
                {data!.prevMonth && (
                  <Message
                    type={
                      data!.today.averageCost < data!.prevMonth.averageCost
                        ? 'positive'
                        : 'negative'
                    }
                    variant="daily"
                    className="mt-8"
                  />
                )}
              </>
            )}
          </section>
        </div>
      </section>

      <section className="mt-16">
        {status === 'success' && (
          <>
            <h2 className="text-xl font-bold">
              Konsumsi Energi Listrik (kWh) setiap jamnya
            </h2>
            <ResponsiveContainer aspect={3} className="mt-8">
              <BarChart
                data={displayData!.chart}
                margin={{ top: 5, right: 5, bottom: 25, left: 5 }}
              >
                <CartesianGrid />
                <XAxis
                  dataKey="timestamp"
                  domain={['dataMin', 'dataMax']}
                  tickFormatter={displayData!.tickFormatter}
                  type="number"
                  scale="time"
                  padding="gap"
                >
                  <Label position="insideBottom" dy={20}>
                    Waktu
                  </Label>
                </XAxis>
                <YAxis>
                  <Label position="insideLeft" angle={-90} dy={110}>
                    Konsumsi Energi Listrik (kWh)
                  </Label>
                </YAxis>
                <Tooltip
                  labelFormatter={displayData!.labelFormatter}
                  formatter={displayData!.formatter}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ left: 40, bottom: 0 }}
                />
                <Bar
                  name="Fasa 1"
                  dataKey="phase1"
                  stackId="chart"
                  fill="#1b998b"
                />
                <Bar
                  name="Fasa 2"
                  dataKey="phase2"
                  stackId="chart"
                  fill="#2e294e"
                />
                <Bar
                  name="Fasa 3"
                  dataKey="phase3"
                  stackId="chart"
                  fill="#f46036"
                />
              </BarChart>
            </ResponsiveContainer>
            <Table
              className="mt-8"
              columns={dailyTableColumns}
              data={displayData!.hourly}
            />
          </>
        )}
      </section>
    </Layout>
  );
};

export default Daily;
