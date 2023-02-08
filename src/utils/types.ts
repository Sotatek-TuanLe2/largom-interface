import { THEME_MODE } from './constants';

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

export interface IThemeState {
  themeMode: THEME_MODE;
  mobile: boolean;
}

export interface ICandle {
  close: number;
  high: number;
  low: number;
  time: number;
  open: number;
  volume: number;
}
