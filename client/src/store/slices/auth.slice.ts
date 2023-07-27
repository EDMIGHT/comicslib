import { createSlice } from '@reduxjs/toolkit';

import { getLocalStore } from '@/lib/helpers/local-storage.helper';
import { checkAuth, logout, signIn, signUp } from '@/store/actions/auth.actions';
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(checkAuth.fulfilled, (state, { payload }) => {
        state.user = payload.user;
      });
  },
});

export default authSlice.reducer;
