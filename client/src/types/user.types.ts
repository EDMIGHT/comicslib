import { string } from 'zod';

import { ITokens } from './response.types';

export type IUser = {
  id: string;
  login: string;
  name: string | null;
  img: string;
  createdAt: Date;
  updatedAt: Date;
};

export type IResponseAuth = {
  user: IUser;
} & ITokens;

export type IShortUser = Pick<IUser, 'id' | 'login' | 'img'>;

export type IProfile = IUser & {
  folders: Folder[];
  _count: {
    ratings: number;
    chapters: number;
    readingHistory: number;
  };
};

export type Folder = {
  id: string;
  title: string;
  userId: string;
};
