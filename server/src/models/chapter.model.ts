import { Chapter } from '@prisma/client';

import prisma from '@/db/prisma';
import { IChapterWithUser, IShortChapter } from '@/types/chapter.types';
import { IPaginationArg, ISortArg } from '@/types/common.types';

type ICreateChapterArg = Pick<Chapter, 'title' | 'comicId' | 'userId' | 'number'>;
type IGetChaptersByComicIdArg = ISortArg & IPaginationArg & { comicId: string };

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
            img: true,
            _count: {
              select: {
                chapters: true,
                comments: true,
                ratings: true,
              },
            },
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
  public static async getByComicIdAndNumber({
    comicId,
    number,
  }: Pick<Chapter, 'comicId' | 'number'>): Promise<Chapter | null> {
    return prisma.chapter.findFirst({
      where: {
        comicId,
        number,
      },
    });
  }
  public static async getNextChapter({
    number,
    comicId,
  }: Pick<Chapter, 'comicId' | 'number'>): Promise<Chapter | null> {
    return prisma.chapter.findFirst({
      where: {
        comicId,
        number: {
          gt: number,
        },
      },
      orderBy: {
        number: 'asc',
      },
    });
  }
  public static async getPrevChapter({
    number,
    comicId,
  }: Pick<Chapter, 'comicId' | 'number'>): Promise<Chapter | null> {
    return prisma.chapter.findFirst({
      where: {
        comicId,
        number: {
          lt: number,
        },
      },
      orderBy: {
        number: 'desc',
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
  public static async getContentByComicId(comicId: string): Promise<IShortChapter[]> {
    return prisma.chapter.findMany({
      where: {
        comicId,
      },
      select: {
        id: true,
        number: true,
        title: true,
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
            img: true,
            _count: {
              select: {
                chapters: true,
                comments: true,
                ratings: true,
              },
            },
          },
        },
      },
    });
  }
}
