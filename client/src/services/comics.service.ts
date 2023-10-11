import { ENDPOINTS } from '@/configs/endpoint.configs';
import { LIMITS, SORT_VARIANTS } from '@/configs/site.configs';
import { ICreateComicFields } from '@/lib/validators/comic.validators';
import { api } from '@/services/api';
import { apiAuth } from '@/services/apiAuth';
import {
  IComic,
  IResponseAllComics,
  IResponseAllComicsWithChapters,
  IResponseRandomComic,
  IResponseSingleComic,
} from '@/types/comic.types';
import { IPaginationArg, ISortArg } from '@/types/response.types';
import { IRating } from '@/types/review.types';

export type IGetAllComicsArg = IPaginationArg &
  ISortArg & {
    folderId?: string;
    ratedUser?: string;
    title?: string;
    genres?: string;
    themes?: string;
    authors?: string;
    statuses?: string;
    date?: 'createdAt' | 'updatedAt' | 'releasedAt' | '';
    startDate?: string;
    endDate?: string;
  };
export type IGetAllComicsWithChaptersArg = IPaginationArg &
  ISortArg & {
    title?: string;
  };

export class ComicsService {
  public static async getAll({
    page = 1,
    limit = LIMITS.comics,
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
      `${ENDPOINTS.comics.origin}?${paginationANDsortQuery}&${searchQuery}&${dateSearchQuery}`
    );
    return data;
  }
  public static async getAllWithChapters({
    page = 1,
    limit = LIMITS.comics,
    sort = SORT_VARIANTS.comicsWithChapters[4].field,
    order = SORT_VARIANTS.comicsWithChapters[4].order,
    title = '',
  }: IGetAllComicsWithChaptersArg) {
    const query = `title=${title}&page=${page}&limit=${limit}&sort=${sort}&order=${order}`;

    const { data } = await api.get<IResponseAllComicsWithChapters>(
      `${ENDPOINTS.comics.withChapters}?${query}`
    );
    return data;
  }

  public static async getById(id: string | number) {
    const { data } = await api.get<IResponseSingleComic>(`${ENDPOINTS.comics.origin}/${id}`);
    return data;
  }
  public static async getUserRating(id: string | number) {
    const { data } = await apiAuth.get<IRating | null>(`${ENDPOINTS.comics.ratingUser}/${id}`);
    return data;
  }
  public static async getRandomId() {
    const { data } = await api.get<IResponseRandomComic>(ENDPOINTS.comics.random);
    return data;
  }
  public static async create(payload: ICreateComicFields) {
    const { data } = await apiAuth.post<IComic>(ENDPOINTS.comics.origin, payload);
    return data;
  }
  public static async updateRating(id: string | number, value: number) {
    const { data } = await apiAuth.patch<IRating>(`${ENDPOINTS.comics.rating}/${id}`, {
      value,
    });
    return data;
  }
}
