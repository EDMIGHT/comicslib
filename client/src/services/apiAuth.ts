import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { TokenHelper } from '@/lib/helpers/token.helper';
import { isServer } from '@/lib/utils';
import { getContentType } from '@/services/api';
import { AuthService } from '@/services/auth.service';

type CustomAxiosRequestConfig = AxiosRequestConfig & {
  _isRetry?: boolean;
};

export const apiAuth = axios.create({
  baseURL: process.env.API_HOST,
  headers: getContentType(),
});

apiAuth.interceptors.request.use((config) => {
  const accessToken = isServer
    ? TokenHelper.getServerAccessToken()
    : TokenHelper.getAccessToken();

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

apiAuth.interceptors.response.use(
  (config) => config,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && originalRequest && !originalRequest._isRetry) {
      originalRequest._isRetry = true;

      if (isServer) {
        return Promise.reject(error);
      }

      try {
        await AuthService.getNewTokens();

        return apiAuth(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
