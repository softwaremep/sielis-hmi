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

export type HeatmapData = {
  dates: {
    start: string;
    end: string;
  };
  heatmap: (number | null)[][];
};

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
  const data: { [key: number]: (number | null)[] } = rawData.heatmap.reduce(
    (result, item) => {
      result[item.day] = result[item.day] || {};
      result[item.day][item.hour] = item.value;
      return result;
    },
    Object.create(null)
  );

  // Fill empty day and hour values
  for (let day = 1; day <= 7; day++) {
    if (!Object.hasOwn(data, day)) {
      data[day] = [];
    }
    for (let hour = 0; hour < 24; hour++) {
      if (!Object.hasOwn(data[day], hour)) {
        data[day][hour] = null;
      }
    }
  }

  return {
    dates: rawData.dates,
    heatmap: Object.values(data)
      .map(d => Object.values(d))
      .reverse(),
  };
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
  xgap: 1,
  ygap: 1,
  colorscale: [
    [0, 'rgb(30, 106, 53)'],
    [0.25, 'rgb(142, 203, 96)'],
    [0.5, 'rgb(242, 250, 170)'],
    [0.75, 'rgb(242, 155, 82)'],
    [1, 'rgb(158, 0, 37)'],
  ],
  hovertemplate:
    'Hour: %{x}<br>' + 'Day: %{y}<br>' + 'Power: %{z} W' + '<extra></extra>',
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
  height: 350,
};
