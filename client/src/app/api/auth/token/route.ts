import { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { ENDPOINTS } from '@/configs/endpoint.configs';
import { AuthCookiesNextResponseHelper } from '@/lib/helpers/auth-cookies-next-response.helper';
import { AuthCookie } from '@/lib/helpers/token.helper';
import { api } from '@/services/api';
import { ITokens } from '@/types/response.types';

export async function POST() {
  try {
    const cookieStore = cookies();

    const refreshToken = cookieStore.get(AuthCookie.REFRESH)?.value;

    const { data, status } = await api.post<ITokens>(ENDPOINTS.auth.tokens, {
      refreshToken,
    });

    const res = NextResponse.json(null, {
      status,
    });

    return AuthCookiesNextResponseHelper.set(res, data);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return NextResponse.json(error.response.data, {
        status: error.status,
      });
    }

    return new Response(
      'Something went wrong when sending a request from the client side to the server',
      {
        status: 503,
      }
    );
  }
}
