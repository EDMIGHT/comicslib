import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { logout } from '@/store/actions/auth.actions';
import { IUser } from '@/types/user.types';

type IAuthSlice = {
  user: IUser | null;
  isLoading: boolean;
};

const initialState: IAuthSlice = {
  user: null,
  isLoading: false,
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
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
      state.user = null;
    });
  },
});

export const authSliceActions = authSlice.actions;

export default authSlice.reducer;
