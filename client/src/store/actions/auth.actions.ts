import { createAsyncThunk } from '@reduxjs/toolkit';

import { AuthService } from '@/services/auth.service';
import { IUser } from '@/types/user.types';

export const logout = createAsyncThunk('auth/logout', async () => {
  // removeFromStorage();
});

export const authMe = createAsyncThunk<IUser | null>('auth/auth-me', async (_, thunkApi) => {
  try {
    return await AuthService.getUser();
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
