import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IResponseAuth } from '@/types/user.types';

type IAuthSlice = Partial<IResponseAuth>;

const initialState: IAuthSlice = {
  user: undefined,
  accessToken: undefined,
  refreshToken: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<IResponseAuth>) => {
      const { user, accessToken, refreshToken } = action.payload || {};
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
  },
});

export const { setAuthData } = authSlice.actions;

export default authSlice.reducer;
