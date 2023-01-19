import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import rf from 'src/services/RequestFactory';

export type MetadataState = {};

const initialState: MetadataState = {};

export const initMetadata = createAsyncThunk(
  'metadata/init',
  async (_params, thunkApi) => {
    //
  },
);

const metadataSlice = createSlice({
  name: 'metadata',
  initialState,
  reducers: {},
});

export const {} = metadataSlice.actions;

export default metadataSlice.reducer;
