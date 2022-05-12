import { isWithinInterval, set } from 'date-fns';

export const currencyOptions = {
  symbol: 'Rp',
  separator: '.',
  decimal: ',',
  precision: 0,
};

export function newUTCDate(date: string) {
  return new Date(date.substring(0, date.length - 3));
}

export function parseValue(
  value: number,
  unit?: string,
  separator: ',' | '.' = ','
) {
  let parsedValue = value.toFixed(2).replace(/[\.,]/g, separator);
  if (unit) {
    parsedValue += ` ${unit}`;
  }
  return parsedValue;
}

export function getTimestampTick(timestamp: number) {
  const date = new Date(timestamp);
  let start, end;
  for (let hours = 1; hours <= 24; hours++) {
    start = set(date, { hours: hours - 1, minutes: 0, seconds: 0 });
    end = set(date, { hours: hours - 1, minutes: 0, seconds: 59 });
    if (isWithinInterval(date, { start, end })) {
      return hours.toString();
    }
  }
  throw new Error(`Invalid timestamp: ${timestamp}`);
}

export const timestampHourMinute = 'HH:mm';
export const timestampHourMinuteSecond = 'HH:mm:ss';
export const timestampMonthYear = 'MMMM yyyy';
export const timestampDayMonthYear = 'dd MMMM yyyy';
export const timestampFullDateTime = 'dd MMMM yyyy HH:mm:ss';

// Area options
export const areaSelectOptions = [
  { value: '133', label: 'Labtek 5' },
  { value: '135', label: 'Labtek 6' },
  { value: '136', label: 'Labtek 7' },
  { value: '138', label: 'Labtek 8' },
  { value: '163', label: 'SBM' },
  { value: '173', label: 'CRCS' },
  { value: '174', label: 'CAS' },
  { value: '175', label: 'CADL' },
  { value: '176', label: 'CIBE' },
];
