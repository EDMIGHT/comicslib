import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_API_URL = process.env.API_HOST || 'http://localhost:3001/api/';

export const baseQuery = fetchBaseQuery({ baseUrl: BASE_API_URL });

export interface IPagination {
  currentPage: number;
  totalPages: number;
}
export interface IPaginationArg {
  page?: number;
  limit?: number;
}

export interface IAuthentication {
  accessToken: string;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: () => ({}),
});
