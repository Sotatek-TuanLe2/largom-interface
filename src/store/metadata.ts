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

export interface ISymbol {
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

export type MetadataState = {
  tickers: ITicker[];
  symbols: ISymbol[];
};

const initialState: MetadataState = {
  tickers: [],
  symbols: [],
};

export const getMetadataTickers = createAsyncThunk(
  'metadata/getTickers',
  async (_params, thunkApi) => {
    const res = await rf.getRequest('MetadataRequest').getTicker24h();
    thunkApi.dispatch(setTickers(res));
  },
);

export const getMetadataSymbols = createAsyncThunk(
  'metadata/getSymbols',
  async (_params, thunkApi) => {
    const res = await rf.getRequest('MetadataRequest').getSymbols();
    thunkApi.dispatch(setSymbols(res));
  },
);

export const initMetadata = createAsyncThunk(
  'metadata/init',
  async (_params, thunkApi) => {
    thunkApi.dispatch(getMetadataTickers());
    thunkApi.dispatch(getMetadataSymbols());
  },
);

const metadataSlice = createSlice({
  name: 'metadata',
  initialState,
  reducers: {
    setTickers: (state, action) => {
      state.tickers = action.payload;
    },
    setSymbols: (state, action) => {
      state.symbols = action.payload;
    },
  },
});

export const { setTickers, setSymbols } = metadataSlice.actions;

export default metadataSlice.reducer;
