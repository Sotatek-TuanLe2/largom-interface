import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

interface IMetadataTrading {
  tickers: ITicker[];
  currencyPairs: ICurrencyPair[];
}

export type MetadataState = {
  trading: IMetadataTrading;
};

const initialState: MetadataState = {
  trading: {
    tickers: [],
    currencyPairs: [],
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

export const initMetadata = createAsyncThunk(
  'metadata/init',
  async (_params, thunkApi) => {
    thunkApi.dispatch(getMetadataTickers());
    thunkApi.dispatch(getMetadataCurrencyPairs());
  },
);

const metadataSlice = createSlice({
  name: 'metadata',
  initialState,
  reducers: {
    setTickers: (state, action) => {
      state.trading.tickers = action.payload;
    },
    setCurrencyPairs: (state, action) => {
      state.trading.currencyPairs = action.payload;
    },
  },
});

export const { setTickers, setCurrencyPairs } = metadataSlice.actions;

export default metadataSlice.reducer;
