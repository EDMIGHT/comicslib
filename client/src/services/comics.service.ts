import { ComicsPathConfig } from '@/configs/url.configs';
import { IResponseAllComics, IResponseSingleComic } from '@/types/comic.types';

import { api } from './api';

export class ComicsService {
  public static async getAll() {
    return api<IResponseAllComics>({
      url: ComicsPathConfig.origin,
      method: 'GET',
    });
  }
  public static async getById(id: string | number) {
    return api<IResponseSingleComic>({
      url: `${ComicsPathConfig.origin}/${id}`,
      method: 'GET',
    });
  }
}
