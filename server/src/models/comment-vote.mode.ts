import { Comment, CommentVote } from '@prisma/client';

import prisma from '@/db/prisma';

type IGetVotesByUserArgs = {
  userId: Comment['userId'];
  commentsIds: Comment['id'][];
};

export class CommentVoteModel {
  public static async getVotes({
    userId,
    commentsIds,
  }: IGetVotesByUserArgs): Promise<CommentVote[]> {
    return prisma.commentVote.findMany({
      where: {
        userId,
        commentId: {
          in: commentsIds,
        },
      },
    });
  }
  public static async countingVote({
    commentId,
    userId,
    type,
  }: CommentVote): Promise<CommentVote> {
    return prisma.commentVote.upsert({
      where: {
        userId_commentId: {
          commentId,
          userId,
        },
      },
      create: { type, commentId, userId },
      update: {
        type,
      },
    });
  }
}
