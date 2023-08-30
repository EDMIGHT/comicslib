import axios from 'axios';

import { getAccessToken, getServerAccessToken } from '@/lib/helpers/token.helper';
import { isServer } from '@/lib/utils';

import { getContentType } from './api';

export const apiAuth = axios.create({
  baseURL: process.env.API_HOST,
  headers: getContentType(),
});

apiAuth.interceptors.request.use(async (config) => {
  let accessToken;

  if (isServer) {
    accessToken = getServerAccessToken();
  } else {
    accessToken = getAccessToken();
  }

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// apiAuth.interceptors.response.use(
//   (config) => config,
//   async (error) => {

//     // сохраняем запрос у которого мы получили ошибку
//     const originalRequest = error.config;

//     if (
//       (error.response.status === 401 ||
//         errorCatch(error) === 'unauthorized access' ||
//         errorCatch(error) === 'unauthorized access, token expired') &&
//       error.config &&
//       !error.config._isRetry
//     ) {
//       // чтоб не повторялась попытка в случае неудачи
//       originalRequest._isRetry = true;

//       try {
//         await AuthService.getNewTokens();

//         return api(originalRequest);
//       } catch (error) {
//         clearTokens();
//         // console.log(err);
//         // console.log(error);
//         // const { cookies } = require('next/headers');
//         // const cookieStore = cookies();
//         // await cookieStore.set({
//         //   name: Tokens.ACCESS,
//         //   value: '',
//         //   expires: new Date('2016-10-05'),
//         //   path: '/', // For all paths
//         // });
//         // console.log(cookieStore.get(Tokens.ACCESS));
//         return Promise.reject(error);
//       }
//     }
//     return Promise.reject(error);
//   }
// );
