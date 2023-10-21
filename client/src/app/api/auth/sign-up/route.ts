import { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { ENDPOINTS } from '@/configs/endpoint.configs';
import { AuthCookiesNextResponseHelper } from '@/lib/helpers/auth-cookies-next-response.helper';
import { signUpRequestValidation } from '@/lib/validators/auth.validators';
import { api } from '@/services/api';
import { ITokens } from '@/types/response.types';

export async function POST(req: NextRequest) {
  try {
    const body = signUpRequestValidation.parse(await req.json());

    const { data, status } = await api.post<ITokens>(ENDPOINTS.auth.signUp, body);

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
