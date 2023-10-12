import { AuthService } from '@/services/auth.service';

import { TokenHelper } from './helpers/token.helper';

export const getAuthServer = async () => {
  try {
    if (TokenHelper.getServerRefreshToken()) {
      return await AuthService.getUser();
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
