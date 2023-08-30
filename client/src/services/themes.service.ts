import { API_THEMES_ENDPOINTS } from '@/configs/endpoint.configs';
import { ITheme } from '@/types/theme.types';

import { api } from './api';

export class ThemesService {
  public static async getAll() {
    const { data } = await api.get<ITheme[]>(API_THEMES_ENDPOINTS.origin);
    return data;
  }
  public static async getByTitle(title: string) {
    const { data } = await api.get<ITheme | null>(`${API_THEMES_ENDPOINTS.origin}/${title}`);
    return data;
  }
}
