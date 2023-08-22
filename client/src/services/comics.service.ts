import { PAGINATION_LIMIT_CONFIG, SORT_VARIANTS } from '@/configs/site.configs';
import { API_COMICS_URL } from '@/configs/url.configs';
import { IResponseAllComics, IResponseComic, IResponseRandomComic } from '@/types/comic.types';
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
    themes?: string;
    authors?: string;
    statuses?: string;
    date?: string;
    startDate?: string;
    endDate?: string;
  };

export class ComicsService {
  public static async getAll({
    page = 1,
    limit = PAGINATION_LIMIT_CONFIG.comics,
    sort = SORT_VARIANTS.comics[0].field,
    order = SORT_VARIANTS.comics[0].order,
    title = '',
    folderId = '',
    ratedUser = '',
    authors = '',
    genres = '',
    themes = '',
    statuses = '',
    date = '',
    startDate = '',
    endDate = '',
  }: IGetAllComicsArg) {
    const paginationANDsortQuery = `page=${page}&limit=${limit}&sort=${sort}&order=${order}`;
    const searchQuery = `title=${title}&folderId=${folderId}&ratedUser=${ratedUser}&authors=${authors}&genres=${genres}&themes=${themes}&statuses=${statuses}`;
    const dateSearchQuery = `date=${date}&startDate=${startDate}&endDate=${endDate}`;

    const { data } = await api.get<IResponseAllComics>(
      `${API_COMICS_URL.origin}?${paginationANDsortQuery}&${searchQuery}&${dateSearchQuery}`
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
  public static async getRandomId() {
    const { data } = await api.get<IResponseRandomComic>(API_COMICS_URL.random);
    return data;
  }
  public static async updateRating(id: string | number, value: number) {
    const { data } = await apiAuth.patch<IRating>(`${API_COMICS_URL.rating}/${id}`, {
      value,
    });
    return data;
  }
}
