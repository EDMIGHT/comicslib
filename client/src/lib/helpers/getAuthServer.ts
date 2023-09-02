import { apiAuth } from '@/services/apiAuth';
import { IUser } from '@/types/user.types';

import { getServerRefreshToken } from './token.helper';

export const getAuthServer = async () => {
  try {
    if (getServerRefreshToken()) {
      const { data } = await apiAuth.get<IUser>('auth/me');
      return data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
