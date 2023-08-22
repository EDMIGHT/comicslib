import { Chapter } from '@prisma/client';

import { IShortComic } from './comic.types';
import { IShortUser } from './user.types';

export type IChapterWithUser = Chapter & {
  user: IShortUser;
};

export type IShortChapter = Pick<Chapter, 'id' | 'number' | 'title'>;

export type IChapterWithShortUserAndShortComic = Chapter & {
  comic: Omit<IShortComic, 'img'>;
  user: Omit<IShortUser, 'img'>;
};
