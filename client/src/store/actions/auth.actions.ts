import { createAsyncThunk } from '@reduxjs/toolkit';

import { errorCatch } from '@/services/apiAuth';
import { AuthService } from '@/services/auth.service';
import { IResponseAuth } from '@/types/user.types';

type ISignUpFields = {};

export const logout = createAsyncThunk('auth/logout', async () => {
  // removeFromStorage();
});
