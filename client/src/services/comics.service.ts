import { API_COMICS_URL } from '@/configs/url.configs';
import { IResponseAllComics, IResponseComic } from '@/types/comic.types';
import { IRating } from '@/types/review.types';

import { api } from './api';
import { apiAuth } from './apiAuth';

export class ComicsService {
  public static async getAll() {
    const { data } = await api.get<IResponseAllComics>(API_COMICS_URL.origin);
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
