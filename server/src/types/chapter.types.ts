import { Chapter } from '@prisma/client';

import { IShortUser } from './user.types';

export type IChapterWithUser = Chapter & {
  user: IShortUser;
};

export type IShortChapter = Pick<Chapter, 'id' | 'number' | 'title'>;
