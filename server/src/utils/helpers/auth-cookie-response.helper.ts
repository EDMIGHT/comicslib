import { Response } from 'express';

import { CreateTokensResult } from '@/services/token.service';

export enum AUTH_COOKIE {
  ACCESS = 'accessToken',
  REFRESH = 'refreshToken',
  EXP = 'exp',
}

const NODE_ENV = process.env.NODE_ENV!;

export const setAuthCookieToResponse = (
  res: Response,
  { accessToken, expiresIn, refreshToken, exp }: CreateTokensResult
): Response => {
  res.cookie(AUTH_COOKIE.ACCESS, accessToken, {
    maxAge: expiresIn * 1000,
    sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
    secure: true,
  });
  res.cookie(AUTH_COOKIE.REFRESH, refreshToken, {
    httpOnly: true,
    sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
    secure: true,
  });
  res.cookie(AUTH_COOKIE.EXP, exp, {
    sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
    secure: true,
  });

  return res;
};

export const clearAuthCookieFromResponse = (res: Response): Response => {
  res.clearCookie(AUTH_COOKIE.ACCESS);
  res.clearCookie(AUTH_COOKIE.REFRESH);
  res.clearCookie(AUTH_COOKIE.EXP);

  return res;
};
