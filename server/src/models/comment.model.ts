import { Comment } from '@prisma/client';

import prisma from '@/db/prisma';
import { ICommentWithUser } from '@/types/comment.types';
import { IPaginationArg, ISortArg } from '@/types/common.types';

type ICreateCommentForComicArgs = Pick<Comment, 'text' | 'userId' | 'comicId'>;

type IGetAllForComicsArgs = ISortArg &
  IPaginationArg & {
    comicId: string;
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
  }: IGetAllForComicsArgs): Promise<ICommentWithUser[]> {
    const offset = (+page - 1) * +limit;

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
      },
    });
  }
  public static async getTotal(comicId: string): Promise<number> {
    return prisma.comment.count({
      where: {
        comicId,
      },
    });
  }
}
