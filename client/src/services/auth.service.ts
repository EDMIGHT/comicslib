import axios from 'axios';

import { ISignInFields } from '@/components/forms/sign-in-form';
import { API_AUTH_URL } from '@/configs/url.configs';
import { isServer } from '@/lib/helpers/general.helper';
import { getRefreshToken, getServerRefreshToken } from '@/lib/helpers/token.helper';
import { ITokens } from '@/types/response.types';
import { IResponseAuth, IUser } from '@/types/user.types';

import { apiAuth } from './apiAuth';

type ISignUpFields = {};

export class AuthService {
  public static async auth(type: 'signIn' | 'signUp', data: ISignInFields | ISignUpFields) {
    const response = await apiAuth<IResponseAuth>({
      url: API_AUTH_URL[type],
      method: 'POST',
      data,
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
