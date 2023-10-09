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

export type ICommentVoteType = 'up' | 'down';

export type ICommentWithUser = IComment & {
  user: IShortUser;
};

export type ICommentWithUserAndVotes = ICommentWithUser & {
  votes: number;
};

export type ICommentWithReplies = ICommentWithUserAndVotes & {
  replies: ICommentWithReplies[];
};

export type IResponseAllComments = {
  comments: ICommentWithReplies[];
} & IPagination;

export type IResponseCheckUserCommentVote = {
  commentId: IComment['id'];
  type: ICommentVoteType | null;
};
