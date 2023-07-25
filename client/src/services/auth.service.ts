import { ISignInFields } from '@/components/sign-in-form';
import { IBadResponse } from '@/types/response.types';
import { IResponseAuth } from '@/types/user.types';

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
  }),
});

export const { useLoginMutation } = authApi;
