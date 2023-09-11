import { Response } from 'express';

import { CreateTokensResult } from '@/services/token.service';

export enum AUTH_COOKIE {
  ACCESS = 'accessToken',
  REFRESH = 'refreshToken',
  EXP = 'exp',
}

export const setAuthCookieToResponse = (
  res: Response,
  { accessToken, expiresIn, refreshToken, exp }: CreateTokensResult
): Response => {
  res.cookie(AUTH_COOKIE.ACCESS, accessToken, {
    maxAge: expiresIn * 1000,
  });
  res.cookie(AUTH_COOKIE.REFRESH, refreshToken, {
    httpOnly: true,
  });
  res.cookie(AUTH_COOKIE.EXP, exp);

  return res;
};

export const clearAuthCookieFromResponse = (res: Response): Response => {
  res.clearCookie(AUTH_COOKIE.ACCESS);
  res.clearCookie(AUTH_COOKIE.REFRESH);
  res.clearCookie(AUTH_COOKIE.EXP);

  return res;
};
