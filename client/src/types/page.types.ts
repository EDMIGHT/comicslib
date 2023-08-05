import { IPagination } from './response.types';

export type IPage = {
  img: string;
};

export type IResponsePage = IPage & IPagination;
