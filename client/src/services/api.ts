import axios from 'axios';

export const getContentType = () => ({
  'Content-Type': 'application/json',
});

export const api = axios.create({
  baseURL: process.env.API_HOST,
  headers: getContentType(),
});
