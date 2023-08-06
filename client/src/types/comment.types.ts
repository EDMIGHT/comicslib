import { IPagination } from './response.types';
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

export type IResponseAllComments = {
  comments: IResponseComment[];
} & IPagination;
