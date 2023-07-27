import { createAsyncThunk } from '@reduxjs/toolkit';

import { ISignInFields } from '@/components/sign-in-form';
import { removeFromStorage } from '@/lib/helpers/token.helper';
import { errorCatch } from '@/services/api';
import { AuthService } from '@/services/auth.service';
import { IResponseAuth } from '@/types/user.types';

type ISignUpFields = {};

export const signUp = createAsyncThunk<IResponseAuth, ISignUpFields>(
  '/auth/signUp',
  async (data, thunkApi) => {
    try {
      return await AuthService.auth('signUp', data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const signIn = createAsyncThunk<IResponseAuth, ISignInFields>(
  '/auth/signIn',
  async (data, thunkApi) => {
    try {
      return await AuthService.auth('signIn', data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  removeFromStorage();
});

export const checkAuth = createAsyncThunk<IResponseAuth>(
  'auth/check-auth',
  async (_, thunkApi) => {
    try {
      const response = await AuthService.getNewTokens();
      return response.data;
    } catch (error) {
      if (errorCatch(error) === 'unauthorized access, token expired') {
        thunkApi.dispatch(logout());
      }

      return thunkApi.rejectWithValue(error);
    }
  }
);
