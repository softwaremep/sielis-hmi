import type { NextPage } from 'next';
import { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  Label,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';
import DatePicker from '../components/DatePicker';
import ExportButton from '../components/ExportButton';
import Layout from '../components/Layout';
import Select from '../components/Select';
import Stat from '../components/Stat';
import Table from '../components/Table';
import {
  fetchMonthlyData,
  getMonthlyCsvFilename,
  monthlyTableColumns,
  parseDisplayMonthlyData,
  parseRawMonthlyData,
} from '../lib/monthly';
import area from '../../area.json';
import { MeterContext } from '../lib/context';

const Monthly: NextPage = () => {
  const [meterId, setMeterId] = useState(-1);
  const [date, setDate] = useState<Date | null>(null);
  const { status, data: rawData } = useQuery(
    ['monthly', meterId, date],
    () => fetchMonthlyData(meterId, date!),
    {
      enabled: meterId !== -1 && !!date,
      refetchInterval: Number(process.env.NEXT_PUBLIC_REFETCH_INTERVAL),
      refetchOnWindowFocus: false,
    }
  );
  const data = rawData ? parseRawMonthlyData(rawData) : undefined;
  const displayData = data ? parseDisplayMonthlyData(data) : undefined;

  const {
    facultyIndex,
    buildingIndex,
    facultyMeterId,
    buildingMeterId,
    floorMeterId,
    setFacultyIndex,
    setBuildingIndex,
    setFloorIndex,
  } = useContext(MeterContext);

  return (
    <Layout title="Bulanan">
      <section>
        <h2 className="text-xl font-bold">Konsumsi Energi Listrik Bulanan</h2>
        <div className="mt-8 flex flex-col items-start gap-8 sm:flex-row lg:gap-0">
          <section className="space-y-8">
            <Select
              title="Fakultas"
              placeholder="Pilih Fakultas"
              options={area.fakultas}
              value={facultyMeterId}
              onChange={e => {
                const selectedMeterId = parseInt(e.target.value);
                setMeterId(selectedMeterId);
                setFacultyIndex(
                  area.fakultas.findIndex(
                    fakultas => fakultas.value === selectedMeterId
                  )
                );
                setBuildingIndex(-1);
                setFloorIndex(-1);
              }}
            />
            <Select
              title="Gedung"
              placeholder="Pilih Gedung"
              options={area.fakultas[facultyIndex]?.gedung}
              value={buildingMeterId}
              onChange={e => {
                const selectedMeterId = parseInt(e.target.value);
                setMeterId(selectedMeterId);
                setBuildingIndex(
                  area.fakultas[facultyIndex].gedung.findIndex(
                    gedung => gedung.value === selectedMeterId
                  )
                );
                setFloorIndex(-1);
              }}
            />
            <Select
              title="Lantai"
              placeholder="Pilih Lantai"
              options={
                area.fakultas[facultyIndex]?.gedung[buildingIndex]?.lantai
              }
              value={floorMeterId}
              onChange={e => {
                const selectedMeterId = parseInt(e.target.value);
                setMeterId(selectedMeterId);
                setFloorIndex(
                  area.fakultas[facultyIndex].gedung[
                    buildingIndex
                  ].lantai.findIndex(lantai => lantai.value === selectedMeterId)
                );
              }}
            />
            <DatePicker
              monthPicker
              title="Bulan"
              placeholder="Pilih bulan"
              date={date}
              onChange={date => setDate(date)}
            />
            {status === 'success' && (
              <ExportButton
                data={rawData!.daily_data}
                filename={getMonthlyCsvFilename(meterId!, date!)}
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

      <section className="mt-16">
        {status === 'success' && (
          <>
            <h2 className="text-xl font-bold">
              Konsumsi Energi Listrik (kWh) setiap harinya
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
              columns={monthlyTableColumns}
              data={displayData!.daily}
            />
          </>
        )}
      </section>
    </Layout>
  );
};

export default Monthly;
