import currency from 'currency.js';
import { format } from 'date-fns';
import { currencyOptions, parseValue } from './utils';

export type RawDailyData = {
  chart_data: {
    fasa1: number;
    fasa2: number;
    fasa3: number;
    timestamp: string;
  }[];
  hourly_data: {
    A: number;
    A1: number;
    A2: number;
    A3: number;
    energi: number;
    pf: number;
    timestamp: string;
    vln: number;
  }[];
  prev_month_data: {
    avg_cost: number;
    avg_daya: number;
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

export type DailyData = {
  chart: {
    phase1: number;
    phase2: number;
    phase3: number;
    timestamp: Date;
  }[];
  hourly: {
    A: number;
    A1: number;
    A2: number;
    A3: number;
    energy: number;
    PF: number;
    timestamp: Date;
    VLN: number;
  }[];
  prevMonth: {
    averageCost: currency;
    averagePower: number;
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

export type DisplayDailyData = {
  chart: {
    phase1: string;
    phase2: string;
    phase3: string;
    timestamp: number;
  }[];
  hourly: {
    A: string;
    A1: string;
    A2: string;
    A3: string;
    energy: string;
    PF: string;
    timestamp: {
      date: string;
      time: string;
    };
    VLN: string;
  }[];
  prevMonth: {
    averageCost: string;
    averagePower: string;
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

export async function fetchDailyData(
  meterId: string,
  date: Date
): Promise<RawDailyData> {
  const queryParams = new URLSearchParams({
    meter_id: meterId,
    date: format(date, 'yyyy-MM-dd'),
  });
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DATA_PROVIDER}/daily?${queryParams.toString()}`
  );
  if (!response.ok) {
    throw new Error('Error, data could not be fetched');
  }
  return response.json();
}

export function parseRawDailyData(data: RawDailyData): DailyData {
  return {
    chart: data.chart_data.map(d => ({
      phase1: d.fasa1,
      phase2: d.fasa2,
      phase3: d.fasa3,
      timestamp: new Date(d.timestamp),
    })),
    hourly: data.hourly_data.map(d => ({
      A: d.A,
      A1: d.A1,
      A2: d.A2,
      A3: d.A3,
      energy: d.energi,
      PF: d.pf,
      timestamp: new Date(d.timestamp),
      VLN: d.vln,
    })),
    prevMonth: {
      averageCost: currency(data.prev_month_data[0].avg_cost),
      averagePower: data.prev_month_data[0].avg_daya,
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

export function parseDisplayDailyData(data: DailyData) {
  return {
    prevMonth: {
      averageCost: data.prevMonth.averageCost.format(currencyOptions),
      averagePower: parseValue(data.prevMonth.averagePower, 'kWh'),
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
