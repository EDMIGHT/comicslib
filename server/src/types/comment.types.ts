import { Comment } from '@prisma/client';

import { IShortUser } from './user.types';

export type ICommentWithUser = Comment & {
  user: IShortUser;
};
