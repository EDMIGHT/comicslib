import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

import { ENDPOINTS } from '@/configs/endpoint.configs';
import { AuthCookiesNextResponseHelper } from '@/lib/helpers/auth-cookies-next-response.helper';
import { apiAuth } from '@/services/apiAuth';

export async function DELETE() {
  try {
    const { status } = await apiAuth.delete<null>(ENDPOINTS.users.origin);

    const res = NextResponse.json(null, {
      status,
    });

    return AuthCookiesNextResponseHelper.clear(res);
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
