import { IShortChapter } from './chapter.types';
import { IShortWithImgComic } from './comic.types';
import { IPagination, ITokens } from './response.types';

export type IUser = {
  id: string;
  login: string;
  name: string | null;
  img: string;
  createdAt: string;
  updatedAt: string;
};

export type IResponseUser = IUser & {
  _count: {
    ratings: number;
    comments: number;
  };
};

export type IResponseAllUser = IPagination & {
  users: IResponseUser[];
};

export type IResponseAuth = {
  user: IUser;
} & ITokens;

export type IShortUser = Pick<IUser, 'id' | 'login' | 'img'>;

export type IShortUserWithCounts = IShortUser & {
  _count: {
    chapters: number;
    comments: number;
    ratings: number;
  };
};

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

export type IFolderWithComics = IFolder & {
  comics: IShortWithImgComic[];
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

export type IBookmark = {
  userId: string;
  comicId: string;
  chapterId: string;
  pageNumber: number;
  updatedAt: string;
};

export type IResponseBookmark = IBookmark & {
  comic: IShortWithImgComic;
  chapter: IShortChapter;
  page: {
    number: number;
  };
};

export type IResponseAllBookmarks = IPagination & {
  bookmarks: IResponseBookmark[];
};

export type IResponseCleaningBookmarks = {
  count: number;
};
