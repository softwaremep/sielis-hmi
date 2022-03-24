export const currencyOptions = {
  symbol: 'Rp',
  separator: '.',
  decimal: ',',
  precision: 0,
};

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

export const timestampHourMinute = 'HH:mm';
export const timestampHourMinuteSecond = 'HH:mm:ss';
export const timestampDayMonthYear = 'dd MMMM yyyy';

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
