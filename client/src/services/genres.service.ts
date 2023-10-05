import { ENDPOINTS } from '@/configs/endpoint.configs';
import { api } from '@/services/api';
import { IGenre } from '@/types/genre.types';

export class GenresService {
  public static async getAll() {
    const { data } = await api.get<IGenre[]>(ENDPOINTS.genres.origin);
    return data;
  }
  public static async getByTitle(title: string) {
    const { data } = await api.get<IGenre | null>(`${ENDPOINTS.genres.origin}/${title}`);
    return data;
  }
}
