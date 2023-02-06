import BigNumber from 'bignumber.js';
import moment from 'moment';
import { NOT_AVAILABLE_TEXT, TO_BE_ANNOUCED_TEXT } from './constants';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const commaNumber = require('comma-number');

// Almost never return exponential notation:
BigNumber.config({ EXPONENTIAL_AT: 1e9 });

export const getDecimalPlaces = (decimals: number) => {
  return decimals > 8 ? 8 : decimals;
};

export const roundNumberWithBase = (n: number, base: number): number => {
  return Math.floor(n / base) * base;
};

export const roundNumber = (
  number: number | string | BigNumber,
  roundMode = BigNumber.ROUND_DOWN,
  decimals = 18,
) => {
  const newNumber = new BigNumber(number).toFixed(
    getDecimalPlaces(decimals),
    roundMode,
  );
  return new BigNumber(newNumber).toString();
};

export const formatTimestamp = (
  timestamp: number,
  format = 'DD/MM/YYYY HH:mm:ss',
): string => {
  if (!timestamp) {
    return TO_BE_ANNOUCED_TEXT;
  }
  return moment(timestamp).format(format);
};

export const formatShortAddress = (address: string, digits = 6): string => {
  if (!address) {
    return NOT_AVAILABLE_TEXT;
  }
  return `${address.substring(0, digits)}...${address.substring(
    address.length - 3,
    address.length,
  )}`;
};

export const convertWeiToDec = (
  weiNumber: string | BigNumber,
  decimals = 18,
): string => {
  const number = new BigNumber(weiNumber || 0).div(
    new BigNumber(10).exponentiatedBy(decimals),
  );
  return new BigNumber(number).toString();
};

export const convertDecToWei = (number: string, decimals = 18): string => {
  return new BigNumber(number || 0)
    .multipliedBy(new BigNumber(10).exponentiatedBy(decimals))
    .toString();
};

export const addTrailingZero = (
  number: string | number | BigNumber,
  decimals = 18,
): string => {
  const result = new BigNumber(number).toString();
  const dotIndex = result.indexOf('.');
  if (dotIndex < 0) {
    return new BigNumber(number).toFixed(decimals).toString();
  }
  const numberAfterDot = result.slice(dotIndex + 1);
  if (numberAfterDot.length > decimals) {
    return result;
  }
  return new BigNumber(number).toFixed(decimals).toString();
};

const _formatLargeNumberIfNeed = (number: string, digits = 0) => {
  if (new BigNumber(number).comparedTo(1000000) < 0) {
    return commaNumber(new BigNumber(number).toString(), ',', '.');
  }
  const SI = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' }, //Thousand
    { value: 1e6, symbol: 'M' }, //Million
    { value: 1e9, symbol: 'B' }, //Billion
    { value: 1e12, symbol: 't' }, //trillion
    { value: 1e15, symbol: 'q' }, //quadrillion
    { value: 1e18, symbol: 'Q' }, //Quintillion
    { value: 1e21, symbol: 's' }, //sextillion
    { value: 1e24, symbol: 'S' }, //Septillion
    { value: 1e27, symbol: 'o' }, //octillion
    { value: 1e30, symbol: 'n' }, //nonillion
    { value: 1e33, symbol: 'd' }, //decillion
    { value: 1e36, symbol: 'U' }, //Undecillion
    { value: 1e39, symbol: 'D' }, //duodecillion
    { value: 1e42, symbol: 'T' }, //Tredecillion
    { value: 1e45, symbol: 'Qt' }, //quattuordecillion
    { value: 1e48, symbol: 'Qd' }, //Quinquadecillion
    { value: 1e51, symbol: 'Sd' }, //Sexdecillion
    { value: 1e54, symbol: 'St' }, //Septendecillion
    { value: 1e57, symbol: 'O' }, //Octodecillion
    { value: 1e60, symbol: 'N' }, //Novendecillion
    { value: 1e63, symbol: 'v' }, //vigintillion
    { value: 1e66, symbol: 'c' }, //unvigintillion
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const num = parseFloat(number);
  let i;
  for (i = SI.length - 1; i > 0; i--) {
    if (num >= SI[i].value) {
      break;
    }
  }
  return (num / SI[i].value).toFixed(digits).replace(rx, '$1') + SI[i].symbol;
};

export function formatWeiNumber(
  value: string | BigNumber,
  decimals = 18,
): string {
  if (
    !value ||
    new BigNumber(value || 0).isZero() ||
    new BigNumber(value).isNegative()
  ) {
    return NOT_AVAILABLE_TEXT;
  }

  const decimalPlaces = decimals > 8 ? 8 : decimals;
  const valueAsString = new BigNumber(value).toString();
  const newValue = new BigNumber(
    convertWeiToDec(valueAsString, decimals),
  ).toFixed(decimalPlaces, BigNumber.ROUND_DOWN);

  return _formatLargeNumberIfNeed(new BigNumber(newValue).toString());
}

export function formatNumber(
  value: string | number | BigNumber,
  decimalPlaces = 4,
): string {
  if (!value || new BigNumber(value || 0).isZero()) {
    return NOT_AVAILABLE_TEXT;
  }

  if (
    new BigNumber(value).isGreaterThan(0) &&
    new BigNumber(value).isLessThan(0.000001)
  ) {
    return '<0.000001';
  }

  return _formatLargeNumberIfNeed(
    roundNumber(value, BigNumber.ROUND_DOWN),
    decimalPlaces,
  );
}

export function formatString(value: string): string {
  if (!value) {
    return NOT_AVAILABLE_TEXT;
  }
  return value;
}

export function formatToPercent(
  number: string | number | BigNumber,
  decimalPlaces = 2,
): string {
  const newValue = new BigNumber(number)
    .multipliedBy(100)
    .toFixed(decimalPlaces);
  return new BigNumber(newValue).toString() + '%';
}

export const PHONE_NUMBER_FORMAT =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)$/;

export const EMAIL_FORMAT =
  /^(?!\.)(?!.*\.\.)[a-zA-Z0-9.]+@([\w-]+\.)+[\w-]{2,4}$/g;
