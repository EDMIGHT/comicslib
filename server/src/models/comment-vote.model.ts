import { Comment, CommentVote } from '@prisma/client';

import prisma from '@/db/prisma';

type IGetVoteArgs = {
  userId: Comment['userId'];
  commentId: Comment['id'];
};
type IGetVotesByUserArgs = {
  userId: Comment['userId'];
  commentsIds: Comment['id'][];
};
type IDeleteVoteArgs = {
  userId: Comment['userId'];
  commentId: Comment['id'];
};

export class CommentVoteModel {
  public static async get({ userId, commentId }: IGetVoteArgs): Promise<CommentVote | null> {
    return prisma.commentVote.findFirst({
      where: {
        commentId,
        userId,
      },
    });
  }
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
  public static async delete({ userId, commentId }: IDeleteVoteArgs): Promise<CommentVote> {
    return prisma.commentVote.delete({
      where: {
        userId_commentId: {
          commentId,
          userId,
        },
      },
    });
  }
}
