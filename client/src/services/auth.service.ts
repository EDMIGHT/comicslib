import axios from 'axios';

import { API_AUTH_URL } from '@/configs/endpoint.configs';
import { getRefreshToken, getServerRefreshToken } from '@/lib/helpers/token.helper';
import { isServer } from '@/lib/utils';
import { ISignInFields, ISignUpFields } from '@/lib/validators/auth.validators';
import { api } from '@/services/api';
import { ITokens } from '@/types/response.types';
import { IResponseAuth, IUser } from '@/types/user.types';

import { apiAuth } from './apiAuth';

export type IRequestSignUpBody = Pick<ISignUpFields, 'login' | 'password' | 'name'>;

export class AuthService {
  public static async auth(
    type: 'signIn' | 'signUp',
    data: ISignInFields | IRequestSignUpBody
  ) {
    const response = await api<IResponseAuth>({
      url: API_AUTH_URL[type],
      method: 'POST',
      data,
      withCredentials: true,
    });

    return response.data;
  }

  public static async getNewTokens(): Promise<ITokens> {
    let refreshToken;

    if (isServer) {
      refreshToken = getServerRefreshToken();
    } else {
      refreshToken = getRefreshToken();
    }
    try {
      const { data } = await axios.post(process.env.API_HOST + API_AUTH_URL.tokens, {
        refreshToken,
      });

      return data;
    } catch (error) {
      return {
        accessToken: '',
        refreshToken: '',
        expiresIn: 0,
      };
    }
  }

  public static async getUser() {
    try {
      const { data } = await apiAuth.get<IUser>(process.env.API_HOST + API_AUTH_URL.authMe);
      return data;
    } catch (error) {
      return null;
    }
  }
}
