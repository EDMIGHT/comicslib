import { PAGINATION_LIMIT_CONFIG } from '@/configs/site.configs';
import { API_COMICS_URL } from '@/configs/url.configs';
import { IResponseAllComics, IResponseComic } from '@/types/comic.types';
import { IPaginationArg, ISortArg } from '@/types/response.types';
import { IRating } from '@/types/review.types';

import { api } from './api';
import { apiAuth } from './apiAuth';

export type IGetAllComicsArg = IPaginationArg &
  ISortArg & {
    folderId?: string;
    ratedUser?: string;
    title?: string;
    genres?: string;
    authors?: string;
    statuses?: string;
  };

export class ComicsService {
  public static async getAll({
    page = 1,
    limit = PAGINATION_LIMIT_CONFIG.comics,
    sort = 'title',
    order = 'desc',
    title = '',
    folderId = '',
    ratedUser = '',
    authors = '',
    genres = '',
    statuses = '',
  }: IGetAllComicsArg) {
    const paginationANDsortQuery = `page=${page}&limit=${limit}&sort=${sort}&order=${order}`;
    const searchQuery = `title=${title}&folderId=${folderId}&ratedUser=${ratedUser}&authors=${authors}&genres=${genres}&statuses=${statuses}`;

    const { data } = await api.get<IResponseAllComics>(
      `${API_COMICS_URL.origin}?${paginationANDsortQuery}&${searchQuery}`
    );
    return data;
  }

  public static async getById(id: string | number) {
    const { data } = await api.get<IResponseComic>(`${API_COMICS_URL.origin}/${id}`);
    return data;
  }
  public static async getUserRating(id: string | number) {
    const { data } = await apiAuth.get<IRating | null>(`${API_COMICS_URL.ratingUser}/${id}`);
    return data;
  }
  public static async updateRating(id: string | number, value: number) {
    const { data } = await apiAuth.patch<IRating>(`${API_COMICS_URL.rating}/${id}`, {
      value,
    });
    return data;
  }
}
