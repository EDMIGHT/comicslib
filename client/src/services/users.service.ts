import { API_USERS_ENDPOINTS } from '@/configs/endpoint.configs';
import { PAGINATION_LIMIT_CONFIG, SORT_VARIANTS } from '@/configs/site.configs';
import { IResponseAllSubscribedComics, IResponseAllUploadedComics } from '@/types/comic.types';
import { IPaginationArg, ISortArg } from '@/types/response.types';
import {
  IBookmark,
  IFolder,
  IFolderForComic,
  IProfile,
  IResponseAllBookmarks,
  IResponseAllUser,
  IResponseCleaningBookmarks,
  IUserFolder,
} from '@/types/user.types';

import { api } from './api';
import { apiAuth } from './apiAuth';

export type IGetAllUsersArg = IPaginationArg &
  ISortArg & {
    login?: string;
  };
export type IGetAllSubscribedComicsArg = IPaginationArg &
  ISortArg & {
    title?: string;
  };
export type IGetAllBookmarksArg = IPaginationArg &
  ISortArg & {
    login: string;
    title?: string;
  };

export type IGetAllUploadsArg = IPaginationArg &
  ISortArg & {
    login: string;
    title?: string;
  };

export type IUpdateBookmarkArg = {
  comicId: string;
  chapterId: string;
  pageNumber: number | string;
};

export class UserService {
  public static async getProfile(login: string) {
    const { data } = await api.get<IProfile>(`${API_USERS_ENDPOINTS.profile}/${login}`);
    return data;
  }
  public static async getAllUsers({
    login = '',
    page = 1,
    limit = PAGINATION_LIMIT_CONFIG.users,
    sort = 'createdAt',
    order = 'desc',
  }: IGetAllUsersArg) {
    const { data } = await api.get<IResponseAllUser>(
      `${API_USERS_ENDPOINTS.origin}/all?login=${login}&page=${page}&limit=${limit}&sort=${sort}&order=${order}`
    );
    return data;
  }
  public static async getFoldersByComic(comicId: string) {
    const { data } = await apiAuth.get<IFolderForComic[]>(
      `${API_USERS_ENDPOINTS.folders}/${comicId}`
    );
    return data;
  }
  public static async getAllSubscribedComics({
    title = '',
    page = 1,
    limit = PAGINATION_LIMIT_CONFIG.comics,
    sort = 'updatedAt',
    order = 'desc',
  }: IGetAllSubscribedComicsArg) {
    const { data } = await apiAuth.get<IResponseAllSubscribedComics>(
      `${API_USERS_ENDPOINTS.comicsSubscribed}?title=${title}&page=${page}&limit=${limit}&sort=${sort}&order=${order}`
    );
    return data;
  }
  public static async getAllFolders(login: string) {
    const { data } = await api.get<IFolder[]>(`${API_USERS_ENDPOINTS.foldersUser}/${login}`);
    return data;
  }
  public static async getUserFolderInfo(login: string, folderId: string) {
    const { data } = await api.get<IUserFolder>(
      `${API_USERS_ENDPOINTS.foldersUser}/${login}/${folderId}`
    );
    return data;
  }
  public static async getAllBookmarks({
    title = '',
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
  public static async getAllUploadedComics({
    login,
    title = '',
    page = 1,
    limit = PAGINATION_LIMIT_CONFIG.comics,
    sort = SORT_VARIANTS.comics[2].field,
    order = SORT_VARIANTS.comics[2].order,
  }: IGetAllUploadsArg) {
    const query = `title=${title}&page=${page}&limit=${limit}&sort=${sort}&order=${order}`;

    const { data } = await apiAuth.get<IResponseAllUploadedComics>(
      `${API_USERS_ENDPOINTS.uploads}/${login}?${query}`
    );
    return data;
  }
  public static async updateBookmark(body: IUpdateBookmarkArg) {
    const { data } = await apiAuth.patch<IBookmark>(API_USERS_ENDPOINTS.bookmark, body);
    return data;
  }
  public static async updateFolder(folderId: string, comicId: string) {
    const { data } = await apiAuth.patch<IProfile>(
      `${API_USERS_ENDPOINTS.folders}/${folderId}/${comicId}`
    );
    return data;
  }
  public static async deleteBookmark(comicId: string) {
    const { data } = await apiAuth.delete<null>(
      `${API_USERS_ENDPOINTS.bookmarkComic}/${comicId}`
    );
    return data;
  }
  public static async cleaningBookmarks() {
    const { data } = await apiAuth.delete<IResponseCleaningBookmarks>(
      `${API_USERS_ENDPOINTS.bookmarkComic}/all`
    );
    return data;
  }
}
