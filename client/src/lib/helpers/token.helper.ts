import Cookies from 'js-cookie';

import { ITokens } from '@/types/response.types';
import { IResponseAuth } from '@/types/user.types';

import { isServer } from './general.helper';

export enum Tokens {
  ACCESS = 'accessToken',
  REFRESH = 'refreshToken',
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

export const getUserFromStorage = () => {
  return JSON.parse(localStorage.getItem('user') || '{}');
};

export const saveTokens = (data: ITokens) => {
  console.log(Cookies.get(Tokens.ACCESS));
  Cookies.set(Tokens.ACCESS, data.accessToken);
  Cookies.set(Tokens.REFRESH, data.refreshToken);
};

export const removeFromStorage = () => {
  Cookies.remove(Tokens.ACCESS);
  Cookies.remove(Tokens.REFRESH);
  localStorage.removeItem('user');
};

export const saveToStorage = (data: IResponseAuth) => {
  saveTokens(data);
  localStorage.setItem('user', JSON.stringify(data.user));
};
