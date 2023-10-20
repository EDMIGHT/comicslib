import { TokenHelper } from '@/lib/helpers/token.helper';
import { AuthService } from '@/services/auth.service';

export const getAuthServer = async () => {
  try {
    console.log('getAuthServer AccessToken', TokenHelper.getServerRefreshToken());
    if (TokenHelper.getServerRefreshToken()) {
      return await AuthService.getUser();
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
