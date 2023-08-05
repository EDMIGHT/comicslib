import { API_COMICS_URL } from '@/configs/url.configs';
import { IResponseAllComics, IResponseSingleComic } from '@/types/comic.types';

import { api } from './api';

export class ComicsService {
  public static async getAll() {
    const { data } = await api.get<IResponseAllComics>(API_COMICS_URL.origin);
    return data;
  }
  public static async getById(id: string | number) {
    const { data } = await api.get<IResponseSingleComic>(`${API_COMICS_URL.origin}/${id}`);
    return data;
  }
}
