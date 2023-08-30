import axios from 'axios';

export const getContentType = () => ({
  'Content-Type': 'application/json',
});

export const errorCatch = (error: any): string => {
  const message = error?.response?.data?.message;

  return message ? message : error.message;
};

export const api = axios.create({
  baseURL: process.env.API_HOST,
  headers: getContentType(),
});
