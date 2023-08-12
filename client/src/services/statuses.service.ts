import { API_STATUSES_URL } from '@/configs/url.configs';
import { IStatus } from '@/types/status.types';

import { api } from './api';

export class StatusesService {
  public static async getAll() {
    const { data } = await api.get<IStatus[]>(API_STATUSES_URL.origin);
    return data;
  }
}
