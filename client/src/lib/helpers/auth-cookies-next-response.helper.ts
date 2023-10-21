import { NextResponse } from 'next/server';

import { AuthCookie } from '@/lib/helpers/token.helper';
import { ITokens } from '@/types/response.types';

const NODE_ENV = process.env.NODE_ENV;

export class AuthCookiesNextResponseHelper {
  public static set(
    res: NextResponse,
    { accessToken, expiresIn, refreshToken }: ITokens
  ): NextResponse {
    const reserve = 30;

    const currentDate = new Date();
    const expirationDate = new Date(currentDate.getTime() + expiresIn * 1000);
    const expirationTimestamp = Math.floor(expirationDate.getTime() / 1000); // UNIX timestamp

    res.cookies.set(AuthCookie.ACCESS, accessToken, {
      maxAge: expiresIn - reserve,
      sameSite: 'lax',
      secure: NODE_ENV === 'production',
    });
    res.cookies.set(AuthCookie.REFRESH, refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: NODE_ENV === 'production',
    });
    res.cookies.set(AuthCookie.EXP, expirationTimestamp.toString(), {
      sameSite: 'lax',
      secure: NODE_ENV === 'production',
    });

    return res;
  }

  public static clear(res: NextResponse): NextResponse {
    res.cookies.delete(AuthCookie.ACCESS);
    res.cookies.delete(AuthCookie.REFRESH);
    res.cookies.delete(AuthCookie.EXP);

    return res;
  }
}
