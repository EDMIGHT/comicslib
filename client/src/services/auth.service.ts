import axios from 'axios';

import { ENDPOINTS } from '@/configs/endpoint.configs';
import { ISignInFields, ISignUpFields } from '@/lib/validators/auth.validators';
import { api } from '@/services/api';
import { IResponseAuth, IUser } from '@/types/user.types';

import { apiAuth } from './apiAuth';

export type IRequestSignUpBody = Pick<ISignUpFields, 'login' | 'password' | 'name'>;

export class AuthService {
  public static async auth(
    type: 'signIn' | 'signUp',
    data: ISignInFields | IRequestSignUpBody
  ) {
    const { data: respData } = await api<IResponseAuth>({
      url: ENDPOINTS.auth[type],
      method: 'POST',
      data,
      withCredentials: true,
    });

    return respData;
  }
  public static async signOut() {
    const { data } = await apiAuth.delete<null>(ENDPOINTS.auth.signOut, {
      withCredentials: true,
    });
    return data;
  }

  public static async getNewTokens() {
    await axios.post<null>(process.env.API_HOST + ENDPOINTS.auth.tokens, null, {
      withCredentials: true,
    });
  }

  public static async getUser() {
    try {
      const { data } = await apiAuth.get<IUser>(process.env.API_HOST + ENDPOINTS.auth.authMe);
      return data;
    } catch (error) {
      return null;
    }
  }
}
