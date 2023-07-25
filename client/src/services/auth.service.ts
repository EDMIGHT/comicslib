import { ISignInFields } from '@/components/sign-in-form';
import { IResponseAuth, IResponseUser } from '@/types/user.types';

import { api } from './api';

export interface IAuthQuery {
  data?: IResponseAuth;
  error?: {
    data: {
      message: string;
    };
    status: number;
  };
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IAuthQuery, ISignInFields>({
      query: ({ ...body }) => ({ url: 'auth/login', method: 'POST', body }),
    }),
    authMe: builder.mutation<IResponseUser, string>({
      query: (accessToken) => ({
        url: 'auth/me',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useAuthMeMutation } = authApi;
