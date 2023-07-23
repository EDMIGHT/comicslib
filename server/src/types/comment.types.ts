import { Comment, User } from '@prisma/client';

export type ICommentWithUser = Comment & {
  user: User;
};
