import { Chapter } from '@prisma/client';

import prisma from '@/db/prisma';
import { IChapterWithUser } from '@/types/chapter.types';
import { IPaginationArg, ISortArg } from '@/types/common.types';

type ICreateChapterArg = Pick<Chapter, 'title' | 'comicId' | 'userId' | 'number'>;
type IGetChaptersByComicIdArg = { comicId: string } & ISortArg & IPaginationArg;

export class ChapterModel {
  public static async getAll({
    comicId,
    limit,
    order,
    page,
    sort,
  }: IGetChaptersByComicIdArg): Promise<IChapterWithUser[]> {
    const offset = (+page - 1) * +limit;
    return prisma.chapter.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        [sort as string]: order,
      },
      where: {
        comicId,
      },
      include: {
        user: {
          select: {
            id: true,
            login: true,
          },
        },
      },
    });
  }
  public static async get(chapterId: string): Promise<Chapter | null> {
    return prisma.chapter.findFirst({
      where: {
        id: chapterId,
      },
    });
  }
  public static async getNextChapter(currentChapterNumber: number): Promise<Chapter | null> {
    return prisma.chapter.findFirst({
      where: {
        number: {
          gt: currentChapterNumber,
        },
      },
      orderBy: {
        number: 'asc',
      },
    });
  }
  public static async getPrevChapter(currentChapterNumber: number): Promise<Chapter | null> {
    return prisma.chapter.findFirst({
      where: {
        number: {
          lt: currentChapterNumber,
        },
      },
      orderBy: {
        number: 'desc',
      },
    });
  }
  public static async create(data: ICreateChapterArg): Promise<IChapterWithUser> {
    return prisma.chapter.create({
      data,
      include: {
        user: {
          select: {
            id: true,
            login: true,
          },
        },
      },
    });
  }

  public static async getTotalChapters(comicId: string): Promise<number> {
    return prisma.chapter.count({
      where: {
        comicId,
      },
    });
  }
}
