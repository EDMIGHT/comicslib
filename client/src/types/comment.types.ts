import { IPagination } from './response.types';
import { IShortUser } from './user.types';

export type IComment = {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  comicId: string;
};

export type ICommentWithUser = IComment & {
  user: IShortUser;
};

export type ICommentWithUserAndVotes = ICommentWithUser & {
  votes: number;
};

export type IResponseComment = ICommentWithUserAndVotes & {
  replies: ICommentWithUserAndVotes[];
};

export type IResponseAllComments = {
  comments: IResponseComment[];
} & IPagination;
