import { Comment } from '@prisma/client';

import prisma from '@/db/prisma';
import { ICommentWithUser } from '@/types/comment.types';

type ICreateCommentForComicArg = Pick<Comment, 'text' | 'userId' | 'comicId'>;

export class CommentModel {
  public static async createForComic(
    data: ICreateCommentForComicArg
  ): Promise<ICommentWithUser> {
    return prisma.comment.create({
      data,
      include: {
        user: true,
      },
    });
  }
}
