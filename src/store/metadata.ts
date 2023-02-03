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

export type MetadataState = {
  tickers: ITicker[];
};

const initialState: MetadataState = {
  tickers: [],
};

export const getMetadataTickers = createAsyncThunk(
  'metadata/getTickers',
  async (_params, thunkApi) => {
    const res = await rf.getRequest('TickerRequest').getTicker24h();
    thunkApi.dispatch(setTickers(res));
  },
);

export const initMetadata = createAsyncThunk(
  'metadata/init',
  async (_params, thunkApi) => {
    thunkApi.dispatch(getMetadataTickers());
  },
);

const metadataSlice = createSlice({
  name: 'metadata',
  initialState,
  reducers: {
    setTickers: (state, action) => {
      state.tickers = action.payload;
    },
  },
});

export const { setTickers } = metadataSlice.actions;

export default metadataSlice.reducer;
