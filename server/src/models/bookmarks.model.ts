import { ReadingHistory } from '@prisma/client';

import prisma from '@/db/prisma';
import { IResponseBookmark } from '@/types/bookmark.types';
import { IPaginationArg, ISortArg } from '@/types/common.types';

type IUpdateBookmark = Pick<ReadingHistory, 'comicId' | 'pageId' | 'userId' | 'chapterId'>;

type IGetAllBookmarksArg = IPaginationArg &
  ISortArg & {
    login: string;
  };
type IGetUserBookmarkArg = {
  comicId: string;
  userId: string;
};

export class BookmarksModel {
  public static async create({
    userId,
    comicId,
    pageId,
    chapterId,
  }: IUpdateBookmark): Promise<ReadingHistory> {
    return prisma.readingHistory.upsert({
      where: {
        userId_comicId: {
          comicId,
          userId,
        },
      },
      create: {
        userId,
        comicId,
        chapterId,
        pageId,
      },
      update: {
        chapterId,
        pageId,
      },
    });
  }
  public static async getAll({
    login,
    page,
    limit,
    sort,
    order,
  }: IGetAllBookmarksArg): Promise<IResponseBookmark[]> {
    const offset = (page - 1) * limit;

    return prisma.readingHistory.findMany({
      take: limit,
      skip: offset,
      where: {
        user: {
          login,
        },
      },
      orderBy: {
        [sort as string]: order,
      },
      include: {
        comic: {
          select: {
            id: true,
            img: true,
            title: true,
          },
        },
        chapter: {
          select: {
            id: true,
            number: true,
            title: true,
          },
        },
        page: {
          select: {
            number: true,
          },
        },
      },
    });
  }
  public static async getAllCount(login: string): Promise<number> {
    return prisma.readingHistory.count({
      where: {
        user: {
          login,
        },
      },
    });
  }
  public static async getUserBookmark({
    comicId,
    userId,
  }: IGetUserBookmarkArg): Promise<ReadingHistory | null> {
    return prisma.readingHistory.findFirst({
      where: {
        userId,
        comicId,
      },
    });
  }
}