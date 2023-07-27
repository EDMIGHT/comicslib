import Cookies from 'js-cookie';

import { ITokens } from '@/types/response.types';
import { IResponseAuth } from '@/types/user.types';

export const getAccessToken = () => {
  const accessToken = Cookies.get('accessToken');
  return accessToken || null;
};

export const getRefreshToken = () => {
  const refreshToken = Cookies.get('refreshToken');
  return refreshToken || null;
};

export const getUserFromStorage = () => {
  return JSON.parse(localStorage.getItem('user') || '{}');
};

export const saveTokenStorage = (data: ITokens) => {
  Cookies.set('accessToken', data.accessToken);
  Cookies.set('refreshToken', data.refreshToken);
};

export const removeFromStorage = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  localStorage.removeItem('user');
};

export const saveToStorage = (data: IResponseAuth) => {
  saveTokenStorage(data);
  localStorage.setItem('user', JSON.stringify(data.user));
};
