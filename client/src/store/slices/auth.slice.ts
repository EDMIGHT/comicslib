import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authMe, logout } from '@/store/actions/auth.actions';
import { IUser } from '@/types/user.types';

type IAuthSlice = {
  user: IUser | null;
  isLoading: boolean;
  error: unknown;
};

const initialState: IAuthSlice = {
  user: null,
  isLoading: false,
  error: null,
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
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(authMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authMe.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(authMe.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const authSliceActions = authSlice.actions;

export default authSlice.reducer;
