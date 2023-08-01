import { createAsyncThunk } from '@reduxjs/toolkit';

import { ISignInFields } from '@/components/sign-in-form';
import { removeFromStorage } from '@/lib/helpers/token.helper';
import { errorCatch } from '@/services/api';
import { AuthService } from '@/services/auth.service';
import { IResponseAuth } from '@/types/user.types';

type ISignUpFields = {};

export const logout = createAsyncThunk('auth/logout', async () => {
  removeFromStorage();
});

export const checkAuth = createAsyncThunk<IResponseAuth>(
  'auth/check-auth',
  async (_, thunkApi) => {
    try {
      const response = await AuthService.getNewTokens();
      return response;
    } catch (error) {
      if (errorCatch(error) === 'unauthorized access, token expired') {
        thunkApi.dispatch(logout());
      }

      return thunkApi.rejectWithValue(error);
    }
  }
);
