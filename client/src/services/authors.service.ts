import { ENDPOINTS } from '@/configs/endpoint.configs';
import { ICreateAuthorFields } from '@/lib/validators/author.validators';
import { api } from '@/services/api';
import { apiAuth } from '@/services/apiAuth';
import { IAuthor, IResponseAllAuthors } from '@/types/author.types';
import { IPaginationArg, ISortArg } from '@/types/response.types';

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
    const searchParams = `page=${page}&limit=${limit}&sort=${sort}&order=${order}&login=${login}`;
    const { data } = await api.get<IResponseAllAuthors>(
      `${ENDPOINTS.authors.origin}?${searchParams}`
    );
    return data;
  }
  public static async get(login: string) {
    const { data } = await api.get<IAuthor>(`${ENDPOINTS.authors.origin}/${login}`);
    return data;
  }
  public static async create(payload: ICreateAuthorFields) {
    const { data } = await apiAuth.post<IAuthor>(ENDPOINTS.authors.origin, payload);
    return data;
  }
}
