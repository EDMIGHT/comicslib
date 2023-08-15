import { Chapter } from '@prisma/client';

import { IShortUser } from './user.types';

export type IChapterWithUser = Chapter & {
  user: Omit<IShortUser, 'img'>;
};

export type IShortChapter = Pick<Chapter, 'id' | 'number' | 'title'>;
