import { Author, Comic, Comment, Genre, Status } from '@prisma/client';

import { IChapterWithUser } from './chapter.types';

export type IComicCount = {
  comments: number;
  folders: number;
  ratings: number;
};

export type IShortComic = Pick<Comic, 'id' | 'img' | 'title'>;

export type IComicWithData = Comic & {
  authors: Author[];
  genres: Genre[];
  status: Status;
  _count: Pick<IComicCount, 'comments' | 'folders'>;
};

export type IComicWithDataSingle = IComicWithData & {
  comments: Comment[];
};

export type IComicWithChapter = Comic & {
  chapters: IChapterWithUser[];
};
