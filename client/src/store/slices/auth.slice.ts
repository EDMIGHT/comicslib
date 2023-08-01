import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getLocalStore } from '@/lib/helpers/local-storage.helper';
import { checkAuth, logout } from '@/store/actions/auth.actions';
import { IResponseUser } from '@/types/user.types';

type IAuthSlice = {
  user: IResponseUser | null;
  isLoading: boolean;
};

const initialState: IAuthSlice = {
  user: getLocalStore('user'),
  // user: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IResponseUser>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(checkAuth.fulfilled, (state, { payload }) => {
        state.user = payload.user;
      });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
