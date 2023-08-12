import { API_GENRES_URL } from '@/configs/url.configs';
import { IGenre } from '@/types/genre.types';

import { api } from './api';

export class GenresService {
  public static async getAll() {
    const { data } = await api.get<IGenre[]>(API_GENRES_URL.origin);
    return data;
  }
}
