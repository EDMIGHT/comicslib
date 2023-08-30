import { API_AUTHORS_URL } from '@/configs/endpoint.configs';
import { ICreateAuthorFields } from '@/lib/validators/author.validators';
import { IAuthor, IResponseAllAuthors } from '@/types/author.types';
import { IPaginationArg, ISortArg } from '@/types/response.types';

import { api } from './api';
import { apiAuth } from './apiAuth';

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
  public static async create(payload: ICreateAuthorFields) {
    const { data } = await apiAuth.post<IAuthor>(API_AUTHORS_URL.origin, payload);
    return data;
  }
}
