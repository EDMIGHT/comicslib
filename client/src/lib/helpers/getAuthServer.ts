import { AuthService } from '@/services/auth.service';

import { getServerRefreshToken } from './token.helper';

export const getAuthServer = async () => {
  try {
    if (getServerRefreshToken()) {
      return await AuthService.getUser();
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
