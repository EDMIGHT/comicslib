import Cookies from 'js-cookie';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export enum AuthCookie {
  ACCESS = 'accessToken',
  REFRESH = 'refreshToken',
  EXP = 'exp',
}

export const getServerCookieStore = (): ReadonlyRequestCookies => {
  // ? Is there a better way to bypass the problem with receiving cookies in the axios interceptor?
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { cookies } = require('next/headers') as { cookies: () => ReadonlyRequestCookies };
  return cookies();
};

export const getAccessToken = () => {
  const accessToken = Cookies.get(AuthCookie.ACCESS);
  return accessToken || null;
};

export const getServerAccessToken = () => {
  const cookieStore = getServerCookieStore();

  return cookieStore.get(AuthCookie.ACCESS)?.value;
};

export const getRefreshToken = () => {
  const refreshToken = Cookies.get(AuthCookie.REFRESH);
  return refreshToken || null;
};

export const getServerRefreshToken = () => {
  const cookieStore = getServerCookieStore();

  return cookieStore.get(AuthCookie.REFRESH)?.value;
};
