import axios from 'axios';

import { ENDPOINTS, LOCAL_ENDPOINTS } from '@/configs/endpoint.configs';
import { ISignInFields, ISignUpFields } from '@/lib/validators/auth.validators';
import { apiAuth } from '@/services/apiAuth';
import { IResponseAuth, IUser } from '@/types/user.types';

export type IRequestSignUpBody = Pick<ISignUpFields, 'login' | 'password'>;

export class AuthService {
  public static async auth(
    type: 'signIn' | 'signUp',
    data: ISignInFields | IRequestSignUpBody
  ) {
    const { data: respData } = await axios<IResponseAuth>({
      url: LOCAL_ENDPOINTS.auth[type],
      method: 'POST',
      data,
      withCredentials: true,
    });

    return respData;
  }
  public static async signOut() {
    const { data } = await axios.delete<null>(LOCAL_ENDPOINTS.auth.signOut, {
      withCredentials: true,
    });
    return data;
  }

  public static async getNewTokens() {
    const { data } = await axios.post<null>(LOCAL_ENDPOINTS.auth.tokens, null, {
      withCredentials: true,
    });

    return data;
  }

  public static async getUser() {
    try {
      const { data } = await apiAuth.get<IUser>(ENDPOINTS.auth.authMe);
      return data;
    } catch (error) {
      return null;
    }
  }
}
