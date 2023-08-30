import { API_STATUSES_ENDPOINTS } from '@/configs/endpoint.configs';
import { IStatus } from '@/types/status.types';

import { api } from './api';

export class StatusesService {
  public static async getAll() {
    const { data } = await api.get<IStatus[]>(API_STATUSES_ENDPOINTS.origin);
    return data;
  }
  public static async getByName(name: string) {
    const { data } = await api.get<IStatus | null>(`${API_STATUSES_ENDPOINTS.origin}/${name}`);
    return data;
  }
}
