import { ReadingHistory } from '@prisma/client';

import prisma from '@/db/prisma';

type IUpdateReadingHistory = Pick<
  ReadingHistory,
  'comicId' | 'pageId' | 'userId' | 'chapterId'
>;

export class ReadingHistoryModel {
  public static async create({ userId, comicId, pageId, chapterId }: IUpdateReadingHistory) {
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
}
