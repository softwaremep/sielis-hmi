import type { NextPage } from 'next';
import { useContext, useMemo, useState } from 'react';
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
import Table from '../components/Table';
import {
  fetchNowData,
  nowTableColumns,
  parseDisplayNowData,
  parseRawNowData,
} from '../lib/now';
import area from '../../area.json';
import { MeterContext } from '../lib/context';

const Home: NextPage = () => {
  const [meterId, setMeterId] = useState(-1);
  const { status, data: rawData } = useQuery(
    ['now', meterId],
    () => fetchNowData(meterId),
    {
      enabled: meterId !== -1,
      refetchInterval: Number(process.env.NEXT_PUBLIC_REFETCH_INTERVAL),
      refetchOnWindowFocus: false,
    }
  );
  const data = rawData ? parseRawNowData(rawData) : undefined;
  const displayData = data ? parseDisplayNowData(data) : undefined;

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
    <Layout title="Beranda">
      <section>
        <h2 className="text-xl font-bold">Total Konsumsi Energi Listrik</h2>
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
            {status === 'success' && (
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
                <div className="grid grid-cols-1 gap-y-2.5 gap-x-8 md:grid-cols-2 lg:grid-cols-3">
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
                      data!.today.averageCost < data!.prevMonth.hourCost
                        ? 'positive'
                        : 'negative'
                    }
                    variant="now"
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
              Konsumsi Daya Listrik (kW) 1 Jam Terakhir
            </h2>
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
                  padding="gap"
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
            <Table
              className="mt-8"
              columns={nowTableColumns}
              data={[displayData!.last]}
            />
          </>
        )}
      </section>
    </Layout>
  );
};

export default Home;
