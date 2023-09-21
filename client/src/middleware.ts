import { NextRequest, NextResponse } from 'next/server';

import { API_AUTH_URL } from '@/configs/endpoint.configs';
import { HREFS } from '@/configs/href.configs';
import { AuthCookie } from '@/lib/helpers/token.helper';

const PRIVATE_PAGES = ['/protected'];

const checkIsPrivatePages = (url: string): boolean =>
  PRIVATE_PAGES.some((page) => url.startsWith(page));

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
  const isTokenValid = checkIsTokenValid(Number(expAccessToken));

  if (!refreshToken && isPrivatePage) {
    return NextResponse.redirect(new URL(HREFS.auth.signIn, req.url));
  }

  if (refreshToken && (!accessToken || !isTokenValid)) {
    const fetchUrl = process.env.API_HOST + API_AUTH_URL.tokens;

    const res = await fetch(fetchUrl, {
      method: 'POST',
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
      credentials: 'include',
    });

    if (res.status === 200) {
      const newHeaders = new Headers(res.headers);
      const cookieHeader = newHeaders.get('set-cookie');

      const newResponse = NextResponse.redirect(req.url);

      newResponse.headers.set('set-cookie', cookieHeader || '');

      return newResponse;
    } else {
      const newResponse = isPrivatePage
        ? NextResponse.redirect(new URL(HREFS.auth.signIn, req.url))
        : NextResponse.next();

      newResponse.cookies.delete(AuthCookie.ACCESS);
      newResponse.cookies.delete(AuthCookie.REFRESH);
      newResponse.cookies.delete(AuthCookie.EXP);

      return newResponse;
    }
  }

  return NextResponse.next();
}
