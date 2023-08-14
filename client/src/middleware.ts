import { NextRequest, NextResponse } from 'next/server';

import { API_AUTH_URL, PUBLIC_URL } from '@/configs/url.configs';
import { Tokens } from '@/lib/helpers/token.helper';

// '/library/:path*'
export const config = {
  matcher: ['/folders', '/library/reading-history'],
};

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get(Tokens.ACCESS)?.value;
  const refreshToken = req.cookies.get(Tokens.REFRESH)?.value;

  if (!refreshToken) {
    return NextResponse.redirect(new URL(PUBLIC_URL.signIn, req.url));
  }

  const fetchUrl = process.env.API_HOST + API_AUTH_URL.tokens;

  if (!accessToken) {
    const res = await fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (res.status === 200) {
      const resTokens = await res.json();

      const newResponse = NextResponse.next();

      newResponse.cookies.set(Tokens.ACCESS, resTokens.accessToken);
      newResponse.cookies.set(Tokens.REFRESH, resTokens.refreshToken);

      return newResponse;
    } else {
      req.cookies.delete(Tokens.REFRESH);
      return NextResponse.redirect(new URL(PUBLIC_URL.signIn, req.url));
    }
  }

  return NextResponse.next();
}
