import { Timezone } from 'src/charting_library/charting_library.min';
import { ICandle, ITrade } from 'src/types';
import { roundNumberWithBase } from './format';

export const DEFAULT_TRADING_VIEW_INTERVAL = '60';

export const addTradeToLastCandle = (
  trade: ITrade,
  lastCandle: ICandle,
  intervalInMilliseconds: number,
  chartRealtimeCallback: (candle: ICandle) => void,
): ICandle => {
  const lastCandleEndTime = lastCandle.time + intervalInMilliseconds;
  const tradePrice = Number(trade.price);
  const tradeTime = new Date(trade.updatedAt || 0).getTime();
  const volume = Number(trade.quantity) * Number(trade.price);
  if (tradeTime >= lastCandleEndTime) {
    const newCandle: ICandle = {
      open: Number(lastCandle.close),
      close: tradePrice,
      high: Math.max(tradePrice, lastCandle.close),
      low: Math.min(tradePrice, lastCandle.close),
      time: roundNumberWithBase(tradeTime, intervalInMilliseconds),
      volume: volume,
    };
    chartRealtimeCallback(newCandle);
    return newCandle;
  } else {
    lastCandle.low = Math.min(tradePrice, lastCandle.low);
    lastCandle.high = Math.max(tradePrice, lastCandle.high);
    lastCandle.close = tradePrice;
    lastCandle.volume += volume;
    chartRealtimeCallback(lastCandle);
    return lastCandle;
  }
};

export const createEmptyCandleIfNeeded = (
  lastCandle: ICandle,
  intervalInMilliseconds: number,
  chartRealtimeCallback: (candle: ICandle) => void,
): ICandle => {
  const lastCandleEndTime = lastCandle.time + intervalInMilliseconds;
  const tradePrice = lastCandle.close;
  const tradeTime = roundNumberWithBase(Date.now(), intervalInMilliseconds);
  if (tradeTime >= lastCandleEndTime) {
    const newCandle: ICandle = {
      open: tradePrice,
      close: tradePrice,
      high: tradePrice,
      low: tradePrice,
      time: tradeTime,
      volume: 0,
    };
    if (chartRealtimeCallback) {
      chartRealtimeCallback(newCandle);
    }
    return newCandle;
  }
  return lastCandle;
};

export function getClientTimezone(): Timezone {
  const timezones: { [key: string]: number } = {
    'America/New_York': -5,
    'America/Los_Angeles': -8,
    'America/Chicago': -6,
    'America/Phoenix': -7,
    'America/Toronto': -5,
    'America/Vancouver': -8,
    'America/Argentina/Buenos_Aires': -3,
    'America/El_Salvador': -6,
    'America/Sao_Paulo': -3,
    'America/Bogota': -5,
    'America/Caracas': -4,
    'Europe/Moscow': 3,
    'Europe/Athens': 2,
    'Europe/Belgrade': 1,
    'Europe/Berlin': 1,
    'Europe/London': 0,
    'Europe/Luxembourg': 1,
    'Europe/Madrid': 1,
    'Europe/Paris': 1,
    'Europe/Rome': 1,
    'Europe/Warsaw': 1,
    'Europe/Istanbul': 3,
    'Europe/Zurich': 1,
    'Australia/Sydney': 10,
    'Australia/Brisbane': 10,
    'Australia/Adelaide': 9.5,
    'Australia/ACT': 10,
    'Asia/Almaty': 6,
    'Asia/Ashkhabad': 5,
    'Asia/Tokyo': 9,
    'Asia/Taipei': 8,
    'Asia/Singapore': 8,
    'Asia/Shanghai': 8,
    'Asia/Seoul': 9,
    'Asia/Tehran': 3.5,
    'Asia/Dubai': 4,
    'Asia/Kolkata': 5.5,
    'Asia/Hong_Kong': 8,
    'Asia/Bangkok': 7,
    'Asia/Chongqing': 8,
    'Asia/Jerusalem': 2,
    'Asia/Kuwait': 3,
    'Asia/Muscat': 4,
    'Asia/Qatar': 3,
    'Asia/Riyadh': 3,
    'Pacific/Auckland': 12,
    'Pacific/Chatham': 12.75,
    'Pacific/Fakaofo': 13,
    'Pacific/Honolulu': -10,
    'America/Mexico_City': -6,
    'Africa/Cairo': 2,
    'Africa/Johannesburg': 2,
    'Asia/Kathmandu': 5.75,
    'US/Mountain': -7,
  };

  const timezone = (new Date().getTimezoneOffset() * -1) / 60;
  for (const key in timezones) {
    if (timezones[key] == timezone) {
      return key as Timezone;
    }
  }
  return 'Etc/UTC';
}

export const getResolutionInMinutes = (interval: string): number => {
  const stringIntervals: { [key: string]: number } = {
    '1D': 24 * 60,
    D: 3 * 24 * 60, // it should be '3D', but there is a bug of TradingView, it call get bars with resolution D
    '3D': 3 * 24 * 60,
    '1W': 7 * 24 * 60,
    '1M': 30 * 24 * 60,
  };
  if (stringIntervals[interval]) {
    return stringIntervals[interval];
  } else {
    return Number(interval);
  }
};

export function getResolutionString(interval: number): string {
  const days = interval / 24 / 60;
  if (days >= 30) return '1M';
  if (days >= 7) return '1W';
  if (days >= 3) return '3D';
  if (days === 1) return '1D';
  return interval.toString();
}
