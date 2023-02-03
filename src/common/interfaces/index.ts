import { THEME_MODE } from '../constant';

export interface ITrade {
  id?: number;
  buyOrderId?: number;
  sellOrderId?: number;
  buyOwnerEmail?: string;
  sellOwnerEmail?: string;
  buyManagerEmail?: string;
  sellManagerEmail?: string;
  instrumentSymbol?: string;
  buyFee?: string;
  sellFee?: string;
  price?: string;
  quantity?: string;
  buyerIsTaker?: boolean;
  buyAccountId?: number;
  sellAccountId?: number;
  operationId?: string;
  createdAt?: string;
  updatedAt?: string;
  tradeSide?: string;
  buyOrderType?: string;
  sellOrderType?: string;
  buyOrder?: { type: string; stopType: string };
  sellOrder?: { type: string; stopType: string };
  side?: string;
  total?: string;
  type?: string;
  liquidity?: string;
}

export interface Instrument {
  id: number;
  symbol: string;
  rootSymbol: string;
  state: string;
  type: number;
  expiry: string;
  baseUnderlying: string;
  quoteCurrency: string;
  underlyingSymbol: string;
  settleCurrency: string;
  initMargin: string;
  maintainMargin: string;
  deleverageable: boolean;
  makerFee: string;
  takerFee: string;
  settlementFee: string;
  hasLiquidity: boolean;
  referenceIndex: string;
  settlementIndex: string;
  fundingBaseIndex: string;
  fundingQuoteIndex: string;
  fundingPremiumIndex: string;
  fundingInterval: number;
  tickSize: string;
  contractSize: string;
  lotSize: string;
  maxPrice: string;
  maxOrderQty: number;
  multiplier: string;
  optionStrikePrice: string;
  optionKoPrice: string;
  riskLimit: string;
  riskStep: string;
  rank: number;
  createdAt: string;
  updatedAt: string;
  isFavorite?: boolean;
}

export interface ThemeState {
  themeMode: THEME_MODE;
  mobile: boolean;
}

export interface Candle {
  close: number;
  high: number;
  low: number;
  time: number;
  open: number;
  volume: number;
}
