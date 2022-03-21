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
  prev_month_data: {
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
  prevMonth: {
    dayCost: number;
    dayPower: number;
    hourCost: number;
    hourPower: number;
    totalCost: number;
    totalPower: number;
  };
  today: {
    averageCost: number;
    averagePower: number;
    totalCost: number;
    totalPower: number;
  };
};

export function parseRawNowData(data: RawNowData): NowData {
  return {
    chart: data.chart_data.map(d => ({
      power: d.daya,
      timestamp: new Date(d.timestamp),
    })),
    last: {
      A: data.last_data[0].A,
      A1: data.last_data[0].A1,
      A2: data.last_data[0].A2,
      A3: data.last_data[0].A3,
      PF: data.last_data[0].PF,
      freq: data.last_data[0].frekuensi,
      volt: data.last_data[0].tegangan,
      timestamp: new Date(data.last_data[0].timestamp),
    },
    prevMonth: {
      dayCost: data.prev_month_data[0].day_cost,
      dayPower: data.prev_month_data[0].day_daya,
      hourCost: data.prev_month_data[0].hour_cost,
      hourPower: data.prev_month_data[0].hour_daya,
      totalCost: data.prev_month_data[0].total_cost,
      totalPower: data.prev_month_data[0].total_daya,
    },
    today: {
      averageCost: data.today_data[0].avg_cost,
      averagePower: data.today_data[0].avg_daya,
      totalCost: data.today_data[0].total_cost,
      totalPower: data.today_data[0].total_daya,
    },
  };
}
