import { Comment } from '@prisma/client';

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
}
