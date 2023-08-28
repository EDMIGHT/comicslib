import { Chapter, Page } from '@prisma/client';

import { IShortComic } from './comic.types';
import { IShortUser } from './user.types';

export type IRequestChapter = Pick<Chapter, 'comicId' | 'title' | 'number'> & {
  pages: Omit<Page, 'chapterId'>[];
};

export type IChapterWithUser = Chapter & {
  user: IShortUser;
};

export type IShortChapter = Pick<Chapter, 'id' | 'number' | 'title'>;

export type IChapterWithShortUserAndShortComic = Chapter & {
  comic: Omit<IShortComic, 'img'>;
  user: Omit<IShortUser, 'img'>;
};
