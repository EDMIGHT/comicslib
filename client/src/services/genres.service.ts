import { API_GENRES_URL } from '@/configs/endpoint.configs';
import { IGenre } from '@/types/genre.types';

import { api } from './api';

export class GenresService {
  public static async getAll() {
    const { data } = await api.get<IGenre[]>(API_GENRES_URL.origin);
    return data;
  }
  public static async getByTitle(title: string) {
    const { data } = await api.get<IGenre | null>(`${API_GENRES_URL.origin}/${title}`);
    return data;
  }
}
