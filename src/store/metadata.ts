import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import rf from 'src/services/RequestFactory';

export interface ITicker {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  lastPrice: string;
  lastPriceChange: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  indexPrice: string;
  oraclePrice: string;
  fundingRate: string;
}

export interface ICurrencyPair {
  base: string;
  delistedTime: any;
  id: string;
  isBuyAllowed: boolean;
  isMarginTrade: boolean;
  isSellAllowed: boolean;
  quote: string;
  status: string;
  symbol: string;
}

export interface IInstrument {
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

interface IMetadataTrading {
  tickers: ITicker[];
  currencyPairs: ICurrencyPair[];
  instrument: IInstrument;
}

export type MetadataState = {
  trading: IMetadataTrading;
};

const initialInstrument: IInstrument = {
  id: -1,
  symbol: '',
  rootSymbol: '',
  state: '',
  type: 0,
  expiry: '',
  baseUnderlying: '',
  quoteCurrency: '',
  underlyingSymbol: '',
  settleCurrency: '',
  initMargin: '',
  maintainMargin: '',
  deleverageable: true,
  makerFee: '',
  takerFee: '',
  settlementFee: '',
  hasLiquidity: false,
  referenceIndex: '',
  settlementIndex: '',
  fundingBaseIndex: '',
  fundingQuoteIndex: '',
  fundingPremiumIndex: '',
  fundingInterval: 0,
  tickSize: '',
  contractSize: '',
  lotSize: '',
  maxPrice: '',
  maxOrderQty: 0,
  multiplier: '',
  optionStrikePrice: '',
  optionKoPrice: '',
  riskLimit: '',
  riskStep: '',
  rank: 0,
  createdAt: '',
  updatedAt: '',
};

const initialState: MetadataState = {
  trading: {
    tickers: [],
    currencyPairs: [],
    instrument: initialInstrument,
  },
};

export const getMetadataTickers = createAsyncThunk(
  'metadata/getTickers',
  async (_params, thunkApi) => {
    const res = await rf.getRequest('MetadataRequest').getTicker24h();
    thunkApi.dispatch(setTickers(res));
  },
);

export const getMetadataCurrencyPairs = createAsyncThunk(
  'metadata/getSymbols',
  async (_params, thunkApi) => {
    const res = await rf.getRequest('MetadataRequest').getSymbols();
    thunkApi.dispatch(setCurrencyPairs(res));
  },
);

export const getMetadataInstruments = createAsyncThunk(
  'metadata/getInstruments',
  async (_params, thunkApi) => {
    const res = await rf.getRequest('MetadataRequest').getInstruments();
    thunkApi.dispatch(setCurrentInstrument(res[0]));
  },
);

export const initMetadata = createAsyncThunk(
  'metadata/init',
  async (_params, thunkApi) => {
    thunkApi.dispatch(getMetadataTickers());
    thunkApi.dispatch(getMetadataCurrencyPairs());
    thunkApi.dispatch(getMetadataInstruments());
  },
);

const metadataSlice = createSlice({
  name: 'metadata',
  initialState,
  reducers: {
    setTickers: (state, action: PayloadAction<ITicker[]>) => {
      state.trading.tickers = action.payload;
    },
    setCurrencyPairs: (state, action: PayloadAction<ICurrencyPair[]>) => {
      state.trading.currencyPairs = action.payload;
    },
    setCurrentInstrument: (state, action: PayloadAction<IInstrument>) => {
      state.trading.instrument = action.payload;
    },
  },
});

export const { setTickers, setCurrencyPairs, setCurrentInstrument } =
  metadataSlice.actions;

export default metadataSlice.reducer;
