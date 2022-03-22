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

export function parseTimestamp(
  timestamp: Date,
  options: Intl.DateTimeFormatOptions
) {
  return new Intl.DateTimeFormat('id', options).format(timestamp);
}
