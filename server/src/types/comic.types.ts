import { Author, Chapter, Comic, Comment, Genre, Status } from '@prisma/client';

import { IChapterWithUser } from './chapter.types';

export type IComicCount = {
  comments: number;
};

export type IShortComic = Pick<Comic, 'id' | 'img' | 'title'>;

export type IComicWithData = Comic & {
  authors: Author[];
  genres: Genre[];
  status: Status;
  _count: IComicCount;
  chapters: Chapter[];
};

export type IComicWithDataSingle = IComicWithData & {
  comments: Comment[];
};

export type IComicWithChapter = Comic & {
  chapters: IChapterWithUser[];
};
