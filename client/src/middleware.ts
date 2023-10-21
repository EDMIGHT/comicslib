import { NextRequest, NextResponse } from 'next/server';

import { ENDPOINTS } from '@/configs/endpoint.configs';
import { HREFS } from '@/configs/href.configs';
import { AuthCookiesNextResponseHelper } from '@/lib/helpers/auth-cookies-next-response.helper';
import { AuthCookie } from '@/lib/helpers/token.helper';
import { IBadResponse, isWithTokensResponse, ITokens } from '@/types/response.types';

const PRIVATE_PAGES = [
  HREFS.library.origin,
  HREFS.create.origin,
  HREFS.settings.account,
  HREFS.auth.signOut,
];
const AUTH_PAGES = [HREFS.auth.signIn, HREFS.auth.signUp];

const checkIsPrivatePages = (url: string): boolean =>
  PRIVATE_PAGES.some((page) => url.startsWith(page));
const checkIsAuthPages = (url: string): boolean =>
  AUTH_PAGES.some((page) => url.startsWith(page));
const checkIsTokenValid = (exp: number): boolean => {
  const currentTime = Math.floor(Date.now() / 1000);
  const expWithReserve = exp - 60; // reserve 1 minute for slow connections

  return currentTime < expWithReserve;
};

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get(AuthCookie.ACCESS)?.value;
  const refreshToken = req.cookies.get(AuthCookie.REFRESH)?.value;
  const expAccessToken = req.cookies.get(AuthCookie.EXP)?.value;

  const isPrivatePage = checkIsPrivatePages(req.nextUrl.pathname);
  const isAuthPage = checkIsAuthPages(req.nextUrl.pathname);
  const isTokenValid = checkIsTokenValid(Number(expAccessToken));

  if (!refreshToken && isPrivatePage) {
    return NextResponse.redirect(new URL(HREFS.auth.signIn, req.url));
  }

  if (refreshToken && isAuthPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (refreshToken && (!accessToken || !isTokenValid)) {
    const fetchUrl = process.env.API_HOST + ENDPOINTS.auth.tokens;

    const res = await fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken,
      }),
    });

    const body = (await res.json()) as ITokens | IBadResponse;

    if (res.status === 200 && isWithTokensResponse(body)) {
      const newResponse = NextResponse.redirect(req.url);

      return AuthCookiesNextResponseHelper.set(newResponse, body);
    }

    const newResponse = isPrivatePage
      ? NextResponse.redirect(new URL(HREFS.auth.signIn, req.url))
      : NextResponse.next();

    return AuthCookiesNextResponseHelper.clear(newResponse);
  }

  return NextResponse.next();
}
