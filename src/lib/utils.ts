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
