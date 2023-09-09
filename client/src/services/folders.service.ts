import { ENDPOINTS } from '@/configs/endpoint.configs';
import { ICreateUserFolderSchema, IEditFolderSchema } from '@/lib/validators/user.validators';
import {
  IFolder,
  IFolderForComic,
  IFolderWithComics,
  IProfile,
  IUserFolder,
} from '@/types/user.types';

import { api } from './api';
import { apiAuth } from './apiAuth';

export type IReorderFolders = {
  folders: string[];
};

export class FoldersService {
  public static async getFoldersByComic(comicId: string) {
    const { data } = await apiAuth.get<IFolderForComic[]>(
      `${ENDPOINTS.folders.comic}/${comicId}`
    );
    return data;
  }
  public static async getAllFolders(login: string) {
    const { data } = await api.get<IFolder[]>(`${ENDPOINTS.folders.user}/${login}`);
    return data;
  }
  public static async getAllUserFolders() {
    const { data } = await apiAuth.get<IFolderWithComics[]>(ENDPOINTS.folders.user);
    return data;
  }
  public static async getFolderInfo(folderId: string) {
    const { data } = await api.get<IUserFolder>(`${ENDPOINTS.folders.origin}/${folderId}`);
    return data;
  }
  public static async createFolder(payload: ICreateUserFolderSchema) {
    const { data } = await apiAuth.post<IFolder>(ENDPOINTS.folders.origin, payload);
    return data;
  }
  public static async updateFolder(folderId: string, payload: IEditFolderSchema) {
    const { data } = await apiAuth.patch<IFolder>(
      `${ENDPOINTS.folders.origin}/${folderId}`,
      payload
    );
    return data;
  }
  public static async updateExistenceComicInFolder(folderId: string, comicId: string) {
    const { data } = await apiAuth.patch<IProfile>(
      `${ENDPOINTS.folders.origin}/${folderId}/${comicId}`
    );
    return data;
  }
  public static async reorderFolders(payload: IReorderFolders) {
    const { data } = await apiAuth.patch<null>(`${ENDPOINTS.folders.origin}/reorder`, payload);
    return data;
  }
  public static async deleteFolder(folderId: string) {
    const { data } = await apiAuth.delete<IFolder>(`${ENDPOINTS.folders.origin}/${folderId}`);
    return data;
  }
}
