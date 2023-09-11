import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authMeThunk } from '@/store/actions/auth.actions';
import { IUser } from '@/types/user.types';

type IAuthSlice = {
  user: IUser | null;
  status: 'idle' | 'loading' | 'error';
  errorMessage: unknown;
};

const initialState: IAuthSlice = {
  user: null,
  status: 'idle',
  errorMessage: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authMeThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(authMeThunk.rejected, (state, { payload }) => {
        state.status = 'error';
        state.errorMessage = payload;
      })
      .addCase(authMeThunk.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.status = 'idle';
        state.errorMessage = null;
      });
  },
});

export const authSliceActions = authSlice.actions;

export default authSlice.reducer;
