import { IPagination } from './response.types';
import { IShortUser } from './user.types';

export type IChapter = {
  id: string;
  number: number;
  title: string;
  comicId: string;
  userId: string;
  createdAt: Date;
};

export type IShortChapter = Pick<IChapter, 'id' | 'number' | 'title'>;

export type IChapterWithUser = IChapter & {
  user: IShortUser;
};

export type IResponseAllChapters = {
  chapters: IChapterWithUser[];
} & IPagination;
