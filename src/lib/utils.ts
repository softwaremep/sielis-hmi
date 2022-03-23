export const currencyOptions = {
  symbol: 'Rp',
  separator: '.',
  decimal: ',',
  precision: 0,
};

export function parseValue(value: number, unit?: string) {
  let parsedValue = value.toFixed(2);
  if (unit) {
    parsedValue += ` ${unit}`;
  }
  return parsedValue;
}

export const timestampHourMinute = 'HH:mm';
export const timestampHourMinuteSecond = 'HH:mm:ss';
export const timestampDayMonthYear = 'dd MMM yyyy';
