import axios from 'axios';

import { ISignInFields } from '@/components/sign-in-form';
import { API_AUTH_URL } from '@/configs/url.configs';
import { isServer } from '@/lib/helpers/general.helper';
import {
  getAccessToken,
  getRefreshToken,
  getServerRefreshToken,
  saveTokens,
  saveToStorage,
} from '@/lib/helpers/token.helper';
import { IResponseAuth, IResponseUser } from '@/types/user.types';

import { api, getContentType } from './api';

type ISignUpFields = {};

export class AuthService {
  public static async auth(type: 'signIn' | 'signUp', data: ISignInFields | ISignUpFields) {
    const response = await api<IResponseAuth>({
      url: API_AUTH_URL[type],
      method: 'POST',
      data,
    });

    return response.data;
  }

  public static async getNewTokens() {
    let refreshToken;

    if (isServer) {
      refreshToken = getServerRefreshToken();
    } else {
      refreshToken = getRefreshToken();
    }

    const { data } = await axios.post<string, { data: IResponseAuth }>(
      process.env.API_HOST + API_AUTH_URL.tokens,
      {
        refreshToken,
      }
    );
    if (data.accessToken) {
      console.log(1);
      saveTokens(data);
    }

    return data;
  }

  public static async getUser() {
    return api.get<IResponseUser>(process.env.API_HOST + API_AUTH_URL.authMe);
  }
}
