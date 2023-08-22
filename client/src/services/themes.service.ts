import { API_THEMES_URL } from '@/configs/url.configs';
import { ITheme } from '@/types/theme.types';

import { api } from './api';

export class ThemesService {
  public static async getAll() {
    const { data } = await api.get<ITheme[]>(API_THEMES_URL.origin);
    return data;
  }
}
