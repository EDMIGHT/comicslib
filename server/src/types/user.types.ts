import { Folder, User } from '@prisma/client';

export type IShortUser = Pick<User, 'id' | 'img' | 'login'>;

export type IProfile = Omit<User, 'password'> & {
  folders: Folder[];
  _count: {
    ratings: number;
    chapters: number;
    readingHistory: number;
  };
};
