import type { NextPage } from 'next';
import { useQuery } from 'react-query';
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Layout from '../components/Layout';
import Message from '../components/Message';
import Select from '../components/Select';
import Stat from '../components/Stat';
import { fetchNowData, parseDisplayNowData, parseRawNowData } from '../lib/now';

// Area options
const selectOptions = [
  { value: '133', label: 'Labtek 5' },
  { value: '135', label: 'Labtek 6' },
  { value: '136', label: 'Labtek 7' },
  { value: '138', label: 'Labtek 8' },
  { value: '163', label: 'SBM' },
  { value: '173', label: 'CRCS' },
  { value: '174', label: 'CAS' },
  { value: '175', label: 'CADL' },
  { value: '176', label: 'CIBE' },
];

const Home: NextPage = () => {
  const meterId = '133';
  const result = useQuery(['now', meterId], () => fetchNowData(meterId));
  const data = result.data ? parseRawNowData(result.data) : undefined;
  const displayData = data ? parseDisplayNowData(data) : undefined;
  return (
    <Layout>
      <section>
        <h2 className="text-xl font-bold">Total Konsumsi Energi Listrik</h2>
        <div className="mt-8 flex items-start justify-between">
          <section className="space-y-8">
            <Select title="Area" options={selectOptions} />
            {result.isSuccess && (
              <>
                <Stat
                  title="Waktu"
                  primary={displayData!.now.date}
                  secondary={displayData!.now.time}
                  variant="main"
                />
                <Stat
                  title="Data terakhir"
                  primary={displayData!.last.timestamp.date}
                  secondary={displayData!.last.timestamp.time}
                  variant="main"
                />
              </>
            )}
          </section>
          <section className="grid grid-cols-3 gap-x-8">
            {result.isSuccess && (
              <>
                <h3 className="col-span-3 mb-2.5 text-lg font-semibold">
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
                <h3 className="col-span-3 mt-8 mb-2.5 text-lg font-semibold">
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
                  primary={displayData!.prevMonth.dayCost}
                  secondary={displayData!.prevMonth.dayPower}
                  variant="aside"
                  unit="hari"
                />
                <Stat
                  title="Rata-rata per jam"
                  primary={displayData!.prevMonth.hourCost}
                  secondary={displayData!.prevMonth.hourPower}
                  variant="aside"
                  unit="jam"
                />
                <Message type="positive" className="col-span-2 mt-8" />
              </>
            )}
          </section>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-xl font-bold">
          Konsumsi Daya Listrik (kW) 1 Jam Terakhir
        </h2>
        {result.isSuccess && (
          <>
            <ResponsiveContainer aspect={3} className="mt-8">
              <LineChart
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
                >
                  <Label position="insideBottom" dy={25}>
                    Waktu
                  </Label>
                </XAxis>
                <YAxis>
                  <Label position="insideLeft" angle={-90} dy={65}>
                    Daya Listrik (kW)
                  </Label>
                </YAxis>
                <Tooltip
                  labelFormatter={displayData!.labelFormatter}
                  formatter={displayData!.formatter}
                />
                <Line dataKey="power" stroke="rgb(30 58 138)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </>
        )}
      </section>
    </Layout>
  );
};

export default Home;
