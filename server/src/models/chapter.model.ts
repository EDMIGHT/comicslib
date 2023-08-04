import { Chapter } from '@prisma/client';

import prisma from '@/db/prisma';
import { IPaginationArg, ISortArg } from '@/types/common.types';

type ICreateChapterArg = Pick<Chapter, 'title' | 'comicId' | 'userId' | 'number'>;
type IGetChaptersByComicIdArg = { comicId: string } & ISortArg & IPaginationArg;

export class ChapterModel {
  public static async getAll({ comicId, limit, order, page, sort }: IGetChaptersByComicIdArg) {
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
  public static async create(data: ICreateChapterArg) {
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
