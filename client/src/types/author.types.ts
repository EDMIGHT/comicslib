import { IPagination } from './response.types';

export type IAuthor = {
  id: string;
  login: string;
  name?: string;
};

export type IResponseAllAuthors = {
  authors: IAuthor[];
} & IPagination;
