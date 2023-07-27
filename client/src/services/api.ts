import axios from 'axios';

import { getAccessToken, removeFromStorage } from '@/lib/helpers/token.helper';

import { AuthService } from './auth.service';

export const getContentType = () => ({
  'Content-Type': 'application/json',
});

export const errorCatch = (error: any): string => {
  const message = error?.response?.data?.message;

  return message ? message : error.message;
};

export const instance = axios.create({
  baseURL: process.env.API_HOST,
  headers: getContentType(),
});

instance.interceptors.request.use(async (config) => {
  const accessToken = getAccessToken();

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

instance.interceptors.response.use(
  (config) => config,
  async (error) => {
    // сохраняем запрос у которого мы получили ошибку
    const originalRequest = error.config;

    if (
      (error.response.status === 401 ||
        errorCatch(error) === 'unauthorized access' ||
        errorCatch(error) === 'unauthorized access, token expired') &&
      error.config &&
      !error.config._isRetry
    ) {
      // чтоб не повторялась попытка в случае неудачи
      originalRequest._isRetry = true;

      try {
        await AuthService.getNewTokens();
        return instance.request(originalRequest);
      } catch (error) {
        if (errorCatch(error) === 'unauthorized access, token expired') {
          removeFromStorage();
        }
      }
    }
  }
);
