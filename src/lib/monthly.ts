import currency from 'currency.js';
import { format } from 'date-fns';
import { currencyOptions, newUTCDate, parseValue } from './utils';

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
    date: format(date, 'yyyy-MM-dd'),
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
    month: {
      averageCost: data.month.averageCost.format(currencyOptions),
      averagePower: parseValue(data.month.averagePower, 'kWh'),
      totalCost: data.month.totalCost.format(currencyOptions),
      totalPower: parseValue(data.month.totalPower, 'kWh'),
    },
  };
}
