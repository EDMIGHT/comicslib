import { IShortUser } from './user.types';

export type IComment = {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type IResponseComment = IComment & {
  user: IShortUser;
};
