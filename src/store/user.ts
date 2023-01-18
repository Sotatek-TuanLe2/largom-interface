import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import rf from 'src/services/RequestFactory';
import { setAuthorizationToRequest } from 'src/utils/authenticate';
import Storage from 'src/utils/storage';
import { TIME_EXPIRE_TOKEN_CLIENT } from 'src/utils/constants';

export type UserAuthType = {
  accessToken: string;
  refreshToken: string;
};

export type UserState = {
  userId: string;
  auth: UserAuthType;
};

const initialState: UserState = {
  userId: '',
  auth: {
    accessToken: Storage.getAccessToken() || '',
    refreshToken: Storage.getRefreshToken() || '',
  },
};

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_params, thunkApi) => {
    //
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload.userId;
    },
    setUserAuth: (state, action) => {
      const timeExpireToken = new Date().getTime() + TIME_EXPIRE_TOKEN_CLIENT;
      const { accessToken, refreshToken } = action.payload;
      state.auth = { accessToken, refreshToken };
      setAuthorizationToRequest(accessToken);
      Storage.setAccessToken(accessToken, timeExpireToken);
      Storage.setRefreshToken(refreshToken);
    },
    clearUser: () => {
      setAuthorizationToRequest(null);
      Storage.logout();
      return initialState;
    },
  },
});

export const { setUserId, setUserAuth, clearUser } = userSlice.actions;

export default userSlice.reducer;
