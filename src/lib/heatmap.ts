import { format } from 'date-fns';

export type RawHeatmapData = {
  dates: {
    start: string;
    end: string;
  };
  heatmap: {
    day: number;
    hour: number;
    value: number;
  }[];
};

export type HeatmapData = number[][];

export async function fetchHeatmapData(
  meterId: number,
  date: Date
): Promise<RawHeatmapData> {
  const queryParams = new URLSearchParams({
    meter_id: meterId.toString(),
    date: format(date, 'yyyy-MM-dd'),
  });
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DATA_PROVIDER}/heatmap?${queryParams.toString()}`
  );
  if (!response.ok) {
    throw new Error('Error, data could not be fetched');
  }
  return response.json();
}

export function parseHeatmapData(rawData: RawHeatmapData): HeatmapData {
  const data: { [key: number]: number[] } = rawData.heatmap.reduce(
    (result, item) => {
      result[item.day] = result[item.day] || [];
      result[item.day].push(item.value);
      return result;
    },
    Object.create(null)
  );
  return Object.values(data).reverse();
}

export const plotlyDataConfig = {
  x: Array.from(Array(24), (_, idx) => idx), // Sequence of integers from 0 to 23
  y: [
    'Saturday',
    'Friday',
    'Thursday',
    'Wednesday',
    'Tuesday',
    'Monday',
    'Sunday',
  ],
  type: 'heatmap',
  colorbar: {
    len: 0.9,
    thickness: 15,
    ticks: 'outside',
    title: { text: 'Power (W)', side: 'right' },
  },
};

export const plotlyLayoutConfig = {
  font: { family: 'InterVariable' },
  margin: { t: 0, l: 120, r: 0 },
  xaxis: {
    title: { text: 'hour' },
    type: 'category',
  },
  width: '100%',
  height: '100%',
};
