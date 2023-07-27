import axios from 'axios';
import Cookies from 'js-cookie';

import { ISignInFields } from '@/components/sign-in-form';
import { AuthPathsConfig } from '@/configs/url.configs';
import { getAccessToken, saveToStorage } from '@/lib/helpers/token.helper';
import { IResponseAuth, IResponseUser } from '@/types/user.types';

import { getContentType, instance } from './api';

type ISignUpFields = {};

export class AuthService {
  public static async auth(type: 'signIn' | 'signUp', data: ISignInFields | ISignUpFields) {
    const response = await instance<IResponseAuth>({
      url: AuthPathsConfig[type],
      method: 'POST',
      data,
    });

    if (response && response.data.accessToken) {
      saveToStorage(response.data);
    }

    return response.data;
  }

  public static async getNewTokens() {
    const refreshToken = Cookies.get('refreshToken');

    const response = await axios.post<string, { data: IResponseAuth }>(
      process.env.API_HOST + AuthPathsConfig.tokens,
      {
        refreshToken,
      },
      {
        headers: getContentType(),
      }
    );

    if (response.data.accessToken) {
      saveToStorage(response.data);
    }

    return response;
  }

  public static async getUser() {
    return instance.get<IResponseUser>(process.env.API_HOST + AuthPathsConfig.authMe);
  }
}
