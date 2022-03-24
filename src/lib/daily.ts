import currency from 'currency.js';

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

export async function fetchDailyData(meterId: string): Promise<any> {
  return null;
}

export function parseRawDailyData(data: any) {
  return null;
}

export function parseDisplayDailyData(data: any) {
  return null;
}
