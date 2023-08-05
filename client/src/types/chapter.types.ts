import { IPagination } from './response.types';
import { IShortUser } from './user.types';

export type IChapter = {
  id: string;
  number: number;
  title: string;
  userId: string;
  createdAt: Date;
};

export type IChapterWithUser = IChapter & {
  user: Omit<IShortUser, 'img'>;
};

export type IResponseAllChapters = {
  chapters: IChapterWithUser[];
} & IPagination;
