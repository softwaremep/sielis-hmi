import currency from 'currency.js';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import {
  currencyOptions,
  newUTCDate,
  parseValue,
  timestampDayMonthYear,
} from './utils';

export type RawMonthlyData = {
  chart_data: {
    fasa1: number;
    fasa2: number;
    fasa3: number;
    timestamp: string;
  }[];
  daily_data: {
    cost: number;
    energi: number;
    fasa1: number;
    fasa2: number;
    fasa3: number;
    pf: number;
    timestamp: string;
    vln: number;
  }[];
  month_data: {
    avg_cost: number;
    avg_daya: number;
    total_cost: number;
    total_daya: number;
  }[];
};

export type MonthlyData = {
  chart: {
    phase1: number;
    phase2: number;
    phase3: number;
    timestamp: Date;
  }[];
  daily: {
    cost: currency;
    energy: number;
    phase1: number;
    phase2: number;
    phase3: number;
    PF: number;
    timestamp: Date;
    VLN: number;
  }[];
  month: {
    averageCost: currency;
    averagePower: number;
    totalCost: currency;
    totalPower: number;
  };
};

export type DisplayMonthlyData = {
  chart: {
    phase1: string;
    phase2: string;
    phase3: string;
    timestamp: number;
  }[];
  tickFormatter: (value: any, index: number) => string;
  labelFormatter: (label: number) => string;
  formatter: (value: number, name: string) => [string, string?];
  daily: {
    cost: string;
    energy: string;
    phase1: string;
    phase2: string;
    phase3: string;
    PF: string;
    timestamp: string;
    VLN: string;
  }[];
  month: {
    averageCost: string;
    averagePower: string;
    totalCost: string;
    totalPower: string;
  };
};

export async function fetchMonthlyData(
  meterId: string,
  date: Date
): Promise<RawMonthlyData> {
  const queryParams = new URLSearchParams({
    meter_id: meterId,
    date: format(date, 'yyyy-MM'),
  });
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DATA_PROVIDER}/monthly?${queryParams.toString()}`
  );
  if (!response.ok) {
    throw new Error('Error, data could not be fetched');
  }
  return response.json();
}

export function parseRawMonthlyData(data: RawMonthlyData): MonthlyData {
  return {
    chart: data.chart_data.map(d => ({
      phase1: d.fasa1,
      phase2: d.fasa2,
      phase3: d.fasa3,
      timestamp: newUTCDate(d.timestamp),
    })),
    daily: data.daily_data.map(d => ({
      cost: currency(d.cost),
      energy: d.energi,
      phase1: d.fasa1,
      phase2: d.fasa2,
      phase3: d.fasa3,
      PF: d.pf,
      timestamp: newUTCDate(d.timestamp),
      VLN: d.vln,
    })),
    month: {
      averageCost: currency(data.month_data[0].avg_cost),
      averagePower: data.month_data[0].avg_daya,
      totalCost: currency(data.month_data[0].total_cost),
      totalPower: data.month_data[0].total_daya,
    },
  };
}

export function parseDisplayMonthlyData(data: MonthlyData): DisplayMonthlyData {
  return {
    chart: data.chart.map(d => ({
      phase1: parseValue(d.phase1, undefined, '.'),
      phase2: parseValue(d.phase2, undefined, '.'),
      phase3: parseValue(d.phase3, undefined, '.'),
      timestamp: d.timestamp.getTime(),
    })),
    tickFormatter: (value, _) => format(value, 'd', { locale: id }),
    labelFormatter: label =>
      format(label, timestampDayMonthYear, { locale: id }),
    formatter: (value, name) => [`${value} kWh`, name],
    daily: data.daily.map(d => ({
      cost: d.cost.format({ ...currencyOptions, symbol: '' }),
      energy: parseValue(d.energy),
      phase1: parseValue(d.phase1),
      phase2: parseValue(d.phase2),
      phase3: parseValue(d.phase3),
      PF: parseValue(d.PF),
      timestamp: format(d.timestamp, 'd', { locale: id }),
      VLN: parseValue(d.VLN),
    })),
    month: {
      averageCost: data.month.averageCost.format(currencyOptions),
      averagePower: parseValue(data.month.averagePower, 'kWh'),
      totalCost: data.month.totalCost.format(currencyOptions),
      totalPower: parseValue(data.month.totalPower, 'kWh'),
    },
  };
}

export function getMonthlyCsvFilename(meterId: string, date: Date) {
  const formattedDate = format(date, 'yyyy-MM', { locale: id });
  return `sielis_monthly_${meterId}_${formattedDate}.csv`;
}

// Table columns
export const monthlyTableColumns = [
  { Header: 'Tanggal', accessor: 'timestamp' },
  { Header: 'Penggunaan (Rp)', accessor: 'cost' },
  { Header: 'Energi (kWh)', accessor: 'energy' },
  { Header: 'Tegangan (VLN)', accessor: 'VLN' },
  { Header: 'Power Factor', accessor: 'PF' },
  { Header: 'Fasa 1 (kWh)', accessor: 'phase1' },
  { Header: 'Fasa 2 (kWh)', accessor: 'phase2' },
  { Header: 'Fasa 3 (kWh)', accessor: 'phase3' },
] as const;
