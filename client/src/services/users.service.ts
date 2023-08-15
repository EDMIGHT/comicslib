import { PAGINATION_LIMIT_CONFIG } from '@/configs/site.configs';
import { API_USERS_ENDPOINTS } from '@/configs/url.configs';
import { IPaginationArg, ISortArg } from '@/types/response.types';
import {
  IBookmark,
  IFolderForComic,
  IProfile,
  IResponseAllBookmarks,
  IUserFolder,
} from '@/types/user.types';

import { api } from './api';
import { apiAuth } from './apiAuth';

export type IGetAllBookmarksArg = IPaginationArg &
  ISortArg & {
    login: string;
  };

export type IUpdateBookmarkArg = {
  comicId: string;
  chapterId: string;
  pageNumber: number | string;
};

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
  public static async getAllBookmarks({
    login,
    page = 1,
    limit = PAGINATION_LIMIT_CONFIG.bookmarks,
    sort = 'updatedAt',
    order = 'desc',
  }: IGetAllBookmarksArg) {
    const { data } = await api.get<IResponseAllBookmarks>(
      `${API_USERS_ENDPOINTS.bookmark}/${login}?page=${page}&limit=${limit}&sort=${sort}&order=${order}`
    );
    return data;
  }
  public static async getComicBookmark(comicId: string) {
    const { data } = await apiAuth.get<IBookmark>(
      `${API_USERS_ENDPOINTS.bookmarkComic}/${comicId}`
    );
    return data;
  }
  public static async updateBookmark(body: IUpdateBookmarkArg) {
    const { data } = await apiAuth.patch<IBookmark>(API_USERS_ENDPOINTS.bookmark, body);
    return data;
  }
}
