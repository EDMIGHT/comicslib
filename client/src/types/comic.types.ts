import { IAuthor } from './author.types';
import { IGenre } from './genre.types';
import { IPagination } from './response.types';

export type IComicCount = {
  comments: number;
  folders: number;
  ratings: number;
};

export type IComic = {
  id: string;
  title: string;
  desc: string | null;
  img: string;
  createdAt: Date;
  updatedAt: Date;
};

export type IShortComic = {
  id: string;
  title: string;
};

export type IResponseComic = IComic & {
  authors: IAuthor[];
  genres: IGenre[];
  _count: Pick<IComicCount, 'comments' | 'folders'>;
  avgRating: number;
};

export type IResponseAllComics = {
  comics: IResponseComic[];
} & IPagination;

export type IResponseSingleComic = IResponseComic & {
  comments: {
    id: string;
    text: string;
  };
};
