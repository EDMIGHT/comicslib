import Cookies from 'js-cookie';

import { ITokens } from '@/types/response.types';
import { IResponseAuth } from '@/types/user.types';

import { isServer } from '../utils';

export enum Tokens {
  ACCESS = 'accessToken',
  REFRESH = 'refreshToken',
  EXPIRES_IN = 'expiresIn',
}

export const getServerCookieStore = () => {
  const { cookies } = require('next/headers');
  return cookies();
};

export const getAccessToken = () => {
  const accessToken = Cookies.get(Tokens.ACCESS);
  return accessToken || null;
};

export const getServerAccessToken = () => {
  const cookieStore = getServerCookieStore();

  return cookieStore.get(Tokens.ACCESS)?.value;
};

export const getRefreshToken = () => {
  const refreshToken = Cookies.get(Tokens.REFRESH);
  return refreshToken || null;
};

export const getServerRefreshToken = () => {
  const cookieStore = getServerCookieStore();

  return cookieStore.get(Tokens.REFRESH)?.value;
};

export const clearTokens = () => {
  if (isServer) {
    const cookieStore = getServerCookieStore();
    cookieStore.remove(Tokens.ACCESS);
    cookieStore.remove(Tokens.REFRESH);
  } else {
    Cookies.remove(Tokens.ACCESS);
    Cookies.remove(Tokens.REFRESH);
  }
};
