import { Author, Comic, Comment, Genre, Status } from '@prisma/client';

export interface IComicCount {
  comments: number;
  folders: number;
  ratings: number;
}

export interface IComicWithData extends Comic {
  authors: Author[];
  genres: Genre[];
  status: Status;
  _count: Pick<IComicCount, 'comments' | 'folders'>;
}

export interface IComicWithDataSingle extends IComicWithData {
  comments: Comment[];
}
