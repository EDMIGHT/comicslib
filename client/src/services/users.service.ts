import axios from 'axios';

import { ENDPOINTS, LOCAL_ENDPOINTS } from '@/configs/endpoint.configs';
import { LIMITS, SORT_VARIANTS } from '@/configs/site.configs';
import { IChangePasswordSchema } from '@/lib/validators/user.validators';
import { api } from '@/services/api';
import { apiAuth } from '@/services/apiAuth';
import { IResponseAllComicsWithChapters } from '@/types/comic.types';
import { IPaginationArg, ISortArg } from '@/types/response.types';
import {
  IBookmark,
  IProfile,
  IResponseAllBookmarks,
  IResponseAllUser,
  IResponseCleaningBookmarks,
  IUser,
} from '@/types/user.types';

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
export type IUpdateUserArg = Partial<Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>>;

export class UsersService {
  public static async getProfile(login: string) {
    const { data } = await api.get<IProfile>(`${ENDPOINTS.users.profile}/${login}`);
    return data;
  }
  public static async getAllUsers({
    login = '',
    page = 1,
    limit = LIMITS.users,
    sort = 'createdAt',
    order = 'desc',
  }: IGetAllUsersArg) {
    const { data } = await api.get<IResponseAllUser>(
      `${ENDPOINTS.users.origin}/all?login=${login}&page=${page}&limit=${limit}&sort=${sort}&order=${order}`
    );
    return data;
  }
  public static async getAllSubscribedComics({
    title = '',
    page = 1,
    limit = LIMITS.comics,
    sort = 'updatedAt',
    order = 'desc',
  }: IGetAllSubscribedComicsArg) {
    const { data } = await apiAuth.get<IResponseAllComicsWithChapters>(
      `${ENDPOINTS.users.comicsSubscribed}?title=${title}&page=${page}&limit=${limit}&sort=${sort}&order=${order}`
    );
    return data;
  }
  public static async getAllBookmarks({
    title = '',
    login,
    page = 1,
    limit = LIMITS.bookmarks,
    sort = 'updatedAt',
    order = 'desc',
  }: IGetAllBookmarksArg) {
    const { data } = await api.get<IResponseAllBookmarks>(
      `${ENDPOINTS.users.bookmark}/${login}?title=${title}&page=${page}&limit=${limit}&sort=${sort}&order=${order}`
    );
    return data;
  }
  public static async getComicBookmark(comicId: string) {
    const { data } = await apiAuth.get<IBookmark>(
      `${ENDPOINTS.users.bookmarkComic}/${comicId}`
    );
    return data;
  }
  public static async getAllUploadedComics({
    login,
    title = '',
    page = 1,
    limit = LIMITS.comics,
    sort = SORT_VARIANTS.comicsWithChapters[4].field,
    order = SORT_VARIANTS.comicsWithChapters[4].order,
  }: IGetAllUploadsArg) {
    const query = `title=${title}&page=${page}&limit=${limit}&sort=${sort}&order=${order}`;

    const { data } = await apiAuth.get<IResponseAllComicsWithChapters>(
      `${ENDPOINTS.users.uploads}/${login}?${query}`
    );
    return data;
  }
  public static async update(payload: IUpdateUserArg) {
    const { data } = await apiAuth.patch<IUser>(ENDPOINTS.users.origin, payload);
    return data;
  }
  public static async updateBookmark(payload: IUpdateBookmarkArg) {
    const { data } = await apiAuth.patch<IBookmark>(ENDPOINTS.users.bookmark, payload);
    return data;
  }
  public static async updatePassword(
    payload: Pick<IChangePasswordSchema, 'oldPassword' | 'newPassword'>
  ) {
    const { data } = await apiAuth.patch<IUser>(`${ENDPOINTS.users.origin}/password`, payload);
    return data;
  }
  public static async deleteBookmark(comicId: string) {
    const { data } = await apiAuth.delete<null>(`${ENDPOINTS.users.bookmarkComic}/${comicId}`);
    return data;
  }
  public static async cleaningBookmarks() {
    const { data } = await apiAuth.delete<IResponseCleaningBookmarks>(
      `${ENDPOINTS.users.bookmarkComic}/all`
    );
    return data;
  }
  public static async deleteAccount() {
    const { data } = await axios.delete<null>(LOCAL_ENDPOINTS.auth.delete, {
      withCredentials: true,
    });
    return data;
  }
}
