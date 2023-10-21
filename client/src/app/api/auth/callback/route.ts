import { NextRequest, NextResponse } from 'next/server';

import { ENDPOINTS } from '@/configs/endpoint.configs';
import { AuthCookiesNextResponseHelper } from '@/lib/helpers/auth-cookies-next-response.helper';
import { api } from '@/services/api';
import { ITokens } from '@/types/response.types';

export async function GET(req: NextRequest) {
  try {
    console.log(req.nextUrl.origin);
    const url = new URL(req.url);
    const refreshToken = url.searchParams.get('refresh_token');

    if (!refreshToken) {
      return NextResponse.redirect(`${req.nextUrl.origin}/`, { status: 303 });
    }

    const { data } = await api.post<ITokens>(ENDPOINTS.auth.tokens, {
      refreshToken,
    });

    const res = NextResponse.redirect(`${req.nextUrl.origin}/`, { status: 303 }); // https://stackoverflow.com/questions/76333292/nextjs13-method-not-allowed-405-code-while-redirecting-in-route-handler

    return AuthCookiesNextResponseHelper.set(res, data);
  } catch (error) {
    return NextResponse.redirect(`${req.nextUrl.origin}/`, { status: 303 });
  }
}
