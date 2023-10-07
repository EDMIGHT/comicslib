import { Comment, CommentVote } from '@prisma/client';

import { LIMITS } from '@/configs/limits.configs';
import prisma from '@/db/prisma';
import { ICommentWithUser } from '@/types/comment.types';
import { IPaginationArg, ISortArg } from '@/types/common.types';

type ICreateCommentForComicArgs = Pick<Comment, 'text' | 'userId' | 'comicId' | 'replyToId'>;

type IGetAllForComicsArgs = ISortArg &
  IPaginationArg & {
    comicId: string;
  };

type IGetRepliesForCommentArgs = IPaginationArg & {
  commentId: string;
};

export class CommentModel {
  public static async getCommentsTest({
    comicId,
    limit,
    order,
    page,
    sort,
  }: IGetAllForComicsArgs) {
    const commentsWithVotes = await prisma.$queryRaw`
      SELECT "Comment"."id", "Comment"."text", SUM(
        CASE "CommentVote"."type"
          WHEN 'up' THEN 1
          WHEN 'down' THEN -1
          ELSE 0
        END) as votes
      FROM "Comment"
      LEFT JOIN "CommentVote" ON "Comment"."id" = "CommentVote"."commentId"
      WHERE "Comment"."comicId" = ${comicId}
      GROUP BY "Comment"."id";
    `;

    return commentsWithVotes;
  }
  public static async getAllForComic({
    comicId,
    limit,
    order,
    page,
    sort,
  }: IGetAllForComicsArgs) {
    const offset = (page - 1) * limit;

    return prisma.comment.findMany({
      where: {
        comicId,
        replyToId: null,
      },
      skip: offset,
      take: limit,
      orderBy: {
        [sort as string]: order,
      },
      include: {
        user: {
          select: {
            id: true,
            login: true,
            img: true,
          },
        },
        replies: {
          take: LIMITS.commentReplies,
          include: {
            user: {
              select: {
                id: true,
                login: true,
                img: true,
              },
            },
            replies: {
              take: LIMITS.commentReplies,
              include: {
                user: {
                  select: {
                    id: true,
                    login: true,
                    img: true,
                  },
                },
              },
            },
            _count: {
              select: {
                replies: true,
              },
            },
          },
        },

        _count: {
          select: {
            replies: true,
          },
        },
      },
    });
  }
  public static async getAllCount(comicId: string): Promise<number> {
    return prisma.comment.count({
      where: {
        comicId,
        replyToId: null,
      },
    });
  }
  public static async getRepliesForComment({
    commentId,
    page,
    limit,
  }: IGetRepliesForCommentArgs) {
    const offset = (page - 1) * limit;

    return prisma.comment.findMany({
      where: {
        replyToId: commentId,
      },
      skip: offset,
      take: LIMITS.commentReplies,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            id: true,
            login: true,
            img: true,
          },
        },
        replies: {
          take: LIMITS.commentReplies,
          include: {
            user: {
              select: {
                id: true,
                login: true,
                img: true,
              },
            },
          },
        },
        _count: {
          select: {
            replies: true,
          },
        },
      },
    });
  }
  public static async getRepliesCount(commentId: string): Promise<number> {
    return prisma.comment.count({
      where: {
        replyToId: commentId,
      },
    });
  }
  public static async getById(id: Comment['id']): Promise<Comment | null> {
    return prisma.comment.findFirst({
      where: {
        id,
      },
    });
  }
  public static async createForComic(
    data: ICreateCommentForComicArgs
  ): Promise<ICommentWithUser> {
    return prisma.comment.create({
      data,
      include: {
        user: {
          select: {
            id: true,
            login: true,
            img: true,
          },
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
