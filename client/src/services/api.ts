import axios from 'axios';

const getContentType = () => ({
  'Content-Type': 'application/json',
});

export const api = axios.create({
  baseURL: process.env.API_HOST,
  headers: getContentType(),
});
