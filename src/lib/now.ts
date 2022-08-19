import currency from 'currency.js';
import { format, set } from 'date-fns';
import { id } from 'date-fns/locale';
import {
  currencyOptions,
  newUTCDate,
  parseValue,
  timestampDayMonthYear,
  timestampHourMinute,
  timestampHourMinuteSecond,
} from './utils';

export type RawNowData = {
  chart_data: {
    daya: number;
    timestamp: string;
  }[];
  last_data: {
    A: number;
    A1: number;
    A2: number;
    A3: number;
    PF: number;
    frekuensi: number;
    tegangan: number;
    timestamp: string;
  }[];
  prev_month_data?: {
    day_cost: number;
    day_daya: number;
    hour_cost: number;
    hour_daya: number;
    total_cost: number;
    total_daya: number;
  }[];
  today_data: {
    avg_cost: number;
    avg_daya: number;
    total_cost: number;
    total_daya: number;
  }[];
};

export type NowData = {
  chart: {
    power: number;
    timestamp: Date;
  }[];
  now: Date;
  last: {
    A: number;
    A1: number;
    A2: number;
    A3: number;
    PF: number;
    freq: number;
    volt: number;
    timestamp: Date;
  };
  prevMonth?: {
    dayCost: currency;
    dayPower: number;
    hourCost: currency;
    hourPower: number;
    totalCost: currency;
    totalPower: number;
  };
  today: {
    averageCost: currency;
    averagePower: number;
    totalCost: currency;
    totalPower: number;
  };
};

export type DisplayNowData = {
  chart: {
    power: number;
    timestamp: number;
  }[];
  tickFormatter: (tick: number) => string;
  labelFormatter: (label: number) => string;
  formatter: (value: number) => [string, string?];
  now: {
    date: string;
    time: string;
  };
  last: {
    A: string;
    A1: string;
    A2: string;
    A3: string;
    PF: string;
    freq: string;
    volt: string;
    timestamp: {
      date: string;
      time: string;
    };
  };
  prevMonth?: {
    dayCost: string;
    dayPower: string;
    hourCost: string;
    hourPower: string;
    totalCost: string;
    totalPower: string;
  };
  today: {
    averageCost: string;
    averagePower: string;
    totalCost: string;
    totalPower: string;
  };
};

export async function fetchNowData(meterId: number): Promise<RawNowData> {
  const queryParams = new URLSearchParams({ meter_id: meterId.toString() });
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DATA_PROVIDER}/now?${queryParams.toString()}`
  );
  if (!response.ok) {
    throw new Error('Error, data could not be fetched');
  }
  return response.json();
}

export function parseRawNowData(data: RawNowData): NowData {
  return {
    chart: data.chart_data
      .map(d => ({
        power: d.daya,
        timestamp: newUTCDate(d.timestamp),
      }))
      .sort((a, b) => (a.timestamp < b.timestamp ? -1 : 1)),
    now: new Date(),
    last: {
      A: data.last_data[0].A,
      A1: data.last_data[0].A1,
      A2: data.last_data[0].A2,
      A3: data.last_data[0].A3,
      PF: data.last_data[0].PF,
      freq: data.last_data[0].frekuensi,
      volt: data.last_data[0].tegangan,
      timestamp: newUTCDate(data.last_data[0].timestamp),
    },
    prevMonth: data.prev_month_data && {
      dayCost: currency(data.prev_month_data[0].day_cost),
      dayPower: data.prev_month_data[0].day_daya,
      hourCost: currency(data.prev_month_data[0].hour_cost),
      hourPower: data.prev_month_data[0].hour_daya,
      totalCost: currency(data.prev_month_data[0].total_cost),
      totalPower: data.prev_month_data[0].total_daya,
    },
    today: {
      averageCost: currency(data.today_data[0].avg_cost),
      averagePower: data.today_data[0].avg_daya,
      totalCost: currency(data.today_data[0].total_cost),
      totalPower: data.today_data[0].total_daya,
    },
  };
}

export function parseDisplayNowData(data: NowData): DisplayNowData {
  return {
    chart: data.chart.map(d => ({
      power: parseFloat(d.power.toFixed(2)),
      timestamp: set(d.timestamp, { seconds: 0 }).getTime(),
    })),
    tickFormatter: tick => format(tick, timestampHourMinute, { locale: id }),
    labelFormatter: label => format(label, timestampHourMinute, { locale: id }),
    formatter: value => [`${value} kW`, undefined],
    now: {
      date: format(data.now, timestampDayMonthYear, { locale: id }),
      time: format(data.now, timestampHourMinuteSecond, { locale: id }),
    },
    last: {
      A: parseValue(data.last.A),
      A1: parseValue(data.last.A1),
      A2: parseValue(data.last.A2),
      A3: parseValue(data.last.A3),
      PF: parseValue(data.last.PF),
      freq: parseValue(data.last.freq),
      volt: parseValue(data.last.volt),
      timestamp: {
        date: format(data.last.timestamp, timestampDayMonthYear, {
          locale: id,
        }),
        time: format(data.last.timestamp, timestampHourMinuteSecond, {
          locale: id,
        }),
      },
    },
    prevMonth: data.prevMonth && {
      dayCost: data.prevMonth.dayCost.format(currencyOptions),
      dayPower: parseValue(data.prevMonth.dayPower, 'kWh'),
      hourCost: data.prevMonth.hourCost.format(currencyOptions),
      hourPower: parseValue(data.prevMonth.hourPower, 'kWh'),
      totalCost: data.prevMonth.totalCost.format(currencyOptions),
      totalPower: parseValue(data.prevMonth.totalPower, 'kWh'),
    },
    today: {
      averageCost: data.today.averageCost.format(currencyOptions),
      averagePower: parseValue(data.today.averagePower, 'kWh'),
      totalCost: data.today.totalCost.format(currencyOptions),
      totalPower: parseValue(data.today.totalPower, 'kWh'),
    },
  };
}

// Table columns
export const nowTableColumns = [
  { Header: 'Tegangan (VLN)', accessor: 'volt' },
  { Header: 'Frekuensi (Hz)', accessor: 'freq' },
  { Header: 'Power Factor', accessor: 'PF' },
  { Header: 'Arus (A)', accessor: 'A' },
  { Header: 'Arus (A1)', accessor: 'A1' },
  { Header: 'Arus (A2)', accessor: 'A2' },
  { Header: 'Arus (A3)', accessor: 'A3' },
] as const;
