import { API_AUTHORS_URL, API_GENRES_URL } from '@/configs/url.configs';
import { IResponseAllAuthors } from '@/types/author.types';
import { IPaginationArg, ISortArg } from '@/types/response.types';

import { api } from './api';

export type IGetAllAuthorsArg = IPaginationArg &
  ISortArg & {
    login?: string;
  };

export class AuthorsService {
  public static async getAll({
    page = 1,
    sort = 'login',
    limit = 5,
    order = 'asc',
    login = '',
  }: IGetAllAuthorsArg) {
    const { data } = await api.get<IResponseAllAuthors>(
      API_AUTHORS_URL.origin +
        `?page=${page}&limit=${limit}&sort=${sort}&order=${order}&login=${login}`
    );
    return data;
  }
}
