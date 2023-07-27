import { ComicsPathConfig } from '@/configs/url.configs';
import { IResponseAllComics, IResponseSingleComic } from '@/types/comic.types';

import { instance } from './api';

export class ComicsService {
  public static async getAll() {
    return instance<IResponseAllComics>({
      url: ComicsPathConfig.origin,
      method: 'GET',
    });
  }
  public static async getById(id: string | number) {
    return instance<IResponseSingleComic>({
      url: `${ComicsPathConfig.origin}/${id}`,
      method: 'GET',
    });
  }
}
