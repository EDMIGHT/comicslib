import { string } from 'zod';

import { IShortChapter } from './chapter.types';
import { IShortWithImgComic } from './comic.types';
import { IPagination, ITokens } from './response.types';

export type IUser = {
  id: string;
  login: string;
  name: string | null;
  img: string;
  createdAt: Date;
  updatedAt: Date;
};

export type IResponseAuth = {
  user: IUser;
} & ITokens;

export type IShortUser = Pick<IUser, 'id' | 'login' | 'img'>;

export type IProfile = IUser & {
  folders: IFolder[];
  _count: {
    ratings: number;
    chapters: number;
    readingHistory: number;
  };
};

export type IFolder = {
  id: string;
  title: string;
  userId: string;
};

export type IUserFolder = IFolder & {
  user: IShortUser;
  _count: {
    comics: number;
  };
};

export type IFolderForComic = IFolder & {
  isComicExist: boolean;
};

export type IReadingHistory = {
  userId: string;
  comicId: string;
  chapterId: string;
  pageId: number;
  updatedAt: string;
};

export type IResponseReadingHistory = IReadingHistory & {
  comic: IShortWithImgComic;
  chapter: IShortChapter;
  page: {
    number: number;
  };
};

export type IResponseAllReadingHistory = IPagination & {
  history: IResponseReadingHistory[];
};
