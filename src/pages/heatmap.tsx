import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import Layout from '../components/Layout';
import Select from '../components/Select';
import area from '../../area.json';
import { MeterContext } from '../lib/context';
import DatePicker from '../components/DatePicker';
import {
  fetchHeatmapData,
  parseHeatmapData,
  plotlyDataConfig,
  plotlyLayoutConfig,
} from '../lib/heatmap';

const Plot = dynamic(
  () =>
    // @ts-ignore
    import('react-plotly.js'),
  { ssr: false }
);

const Heatmap: NextPage = () => {
  const [meterId, setMeterId] = useState(-1);
  const [date, setDate] = useState<Date | null>(null);
  const { status, data: rawData } = useQuery(
    ['heatmap', meterId, date],
    () => fetchHeatmapData(meterId, date!),
    {
      enabled: meterId !== -1 && !!date,
      refetchInterval: Number(process.env.NEXT_PUBLIC_REFETCH_INTERVAL),
      refetchOnWindowFocus: false,
    }
  );

  const data = rawData ? parseHeatmapData(rawData) : undefined;

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
    <Layout title="Heatmap">
      <section>
        <h2 className="text-xl font-bold">Average Power Consumption</h2>
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
              title="Tanggal"
              placeholder="Pilih tanggal"
              date={date}
              onChange={date => setDate(date)}
            />
            {/* {status === 'success' && (
              <ExportButton
                data={rawData!.hourly_data}
                filename={getDailyCsvFilename(meterId!, date!)}
              />
            )} */}
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
            {data && (
              <Plot
                // @ts-ignore
                data={[{ ...plotlyDataConfig, z: data }]}
                layout={plotlyLayoutConfig}
              />
            )}
          </section>
        </div>
      </section>
    </Layout>
  );
};

export default Heatmap;
