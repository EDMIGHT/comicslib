import { IAuthor } from './author.types';
import { IChapterWithUser, IShortChapter } from './chapter.types';
import { IGenre } from './genre.types';
import { IPagination } from './response.types';
import { IStatus } from './status.types';
import { ITheme } from './theme.types';

export type IComicCount = {
  comments: number;
};

export type IComic = {
  id: string;
  title: string;
  desc: string | null;
  img: string;
  createdAt: string;
  updatedAt: string;
  releasedAt: string;
};

export type IShortComic = {
  id: string;
  title: string;
};

export type IShortWithImgComic = IShortComic & {
  img: string;
};

export type IResponseComic = IComic & {
  authors: IAuthor[];
  genres: IGenre[];
  themes: ITheme[];
  status: IStatus;
  avg_rating: number;
  unique_bookmarks_count: number;
  comments_count: number;
};

export type IResponseAllComics = {
  comics: IResponseComic[];
} & IPagination;

export type IResponseSingleComic = IResponseComic & {
  first_chapter: IShortChapter;
};

export type IResponseRandomComic = {
  randomId: string;
};

export type IComicWithChapter = IComic & {
  chapters: IChapterWithUser[];
};

export type IResponseAllSubscribedComics = IPagination & {
  comics: IComicWithChapter[];
};

export type IResponseAllUploadedComics = IPagination & {
  comics: IComicWithChapter[];
};
