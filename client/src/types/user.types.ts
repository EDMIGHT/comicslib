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