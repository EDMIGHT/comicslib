import { API_PROFILE_URL } from '@/configs/url.configs';
import { IProfile } from '@/types/user.types';

import { api } from './api';

export class ProfileService {
  public static async get(login: string) {
    const { data } = await api.get<IProfile>(`${API_PROFILE_URL.origin}/${login}`);
    return data;
  }
}
