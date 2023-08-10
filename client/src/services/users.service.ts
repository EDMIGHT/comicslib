import { API_USERS_ENDPOINTS } from '@/configs/url.configs';
import { IFolderForComic, IProfile, IUserFolder } from '@/types/user.types';

import { api } from './api';
import { apiAuth } from './apiAuth';

export class UserService {
  public static async get(login: string) {
    const { data } = await api.get<IProfile>(`${API_USERS_ENDPOINTS.origin}/${login}`);
    return data;
  }
  public static async getFoldersByComic(comicId: string) {
    const { data } = await apiAuth.get<IFolderForComic[]>(
      `${API_USERS_ENDPOINTS.folders}/${comicId}`
    );
    return data;
  }
  public static async updateFolder(folderId: string, comicId: string) {
    const { data } = await apiAuth.patch<IProfile>(
      `${API_USERS_ENDPOINTS.folders}/${folderId}/${comicId}`
    );
    return data;
  }
  public static async getUserFolder(login: string, folderId: string) {
    const { data } = await api.get<IUserFolder>(
      `${API_USERS_ENDPOINTS.folders}/${login}/${folderId}`
    );
    return data;
  }
}
