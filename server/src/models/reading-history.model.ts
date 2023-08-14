import { ReadingHistory } from '@prisma/client';

import prisma from '@/db/prisma';
import { IPaginationArg, ISortArg } from '@/types/common.types';

type IUpdateReadingHistory = Pick<
  ReadingHistory,
  'comicId' | 'pageId' | 'userId' | 'chapterId'
>;

type IGetAllReadingHistory = IPaginationArg &
  ISortArg & {
    login: string;
  };

export class ReadingHistoryModel {
  public static async create({
    userId,
    comicId,
    pageId,
    chapterId,
  }: IUpdateReadingHistory): Promise<ReadingHistory> {
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
  public static async getAll({ login, page, limit, sort, order }: IGetAllReadingHistory) {
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
}
