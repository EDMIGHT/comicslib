import axios from 'axios';

import { ComicsPathConfig } from '@/configs/url.configs';
import { IResponseAllComics, IResponseSingleComic } from '@/types/comic.types';

export class ComicsService {
  public static async getAll() {
    const { data } = await axios<IResponseAllComics>(
      `${process.env.API_HOST}${ComicsPathConfig.origin}`
    );
    return data;
  }
  public static async getById(id: string | number) {
    const { data } = await axios<IResponseSingleComic>(
      `${process.env.API_HOST}${ComicsPathConfig.origin}/${id}`
    );
    return data;
  }
}
