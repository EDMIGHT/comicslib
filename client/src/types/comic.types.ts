import { IAuthor } from './author.types';
import { IChapter, IChapterWithUser } from './chapter.types';
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
  createdAt: Date;
  updatedAt: Date;
  releasedAt: Date;
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
  _count: IComicCount;
  chapters: IChapter[];
  avgRating: number;
  countUniqueSubscribes: number;
};

export type IResponseAllComics = {
  comics: IResponseComic[];
} & IPagination;

export type IResponseRandomComic = {
  randomId: string;
};

export type IComicWithChapter = IComic & {
  chapters: IChapterWithUser[];
};

export type IResponseAllSubscribedComics = IPagination & {
  comics: IComicWithChapter[];
};
