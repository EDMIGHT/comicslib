import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';

import { baseQuery } from '@/services/api';
import { setAuthData } from '@/store/slices/auth.slice';

interface RefreshResult {
  accessToken: string;
  refreshToken: string;
}

export const authMiddleware: Middleware = (store) => (next) => async (action) => {
  if (isRejectedWithValue(action) && action.payload.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
      const refreshResult = (await baseQuery(
        {
          url: '/auth/token',
          method: 'POST',
          body: { refreshToken },
        },
        store.getState(),
        {}
      )) as { data: RefreshResult };

      if (refreshResult.data) {
        localStorage.setItem('accessToken', refreshResult.data.accessToken);
        localStorage.setItem('refreshToken', refreshResult.data.refreshToken);

        const response = store.dispatch(action.meta.arg);

        if (response.meta.requestStatus === 'fulfilled') {
          store.dispatch(setAuthData(response.payload));
        }
      }
    }
  }

  return next(action);
};
