import { Page } from '@prisma/client';

import prisma from '@/db/prisma';

type ICreateGenreArg = Page;
type IGetPageArg = Pick<Page, 'chapterId' | 'number'>;

export class PageModel {
  public static async get(data: IGetPageArg): Promise<Page | null> {
    return prisma.page.findFirst({
      where: data,
    });
  }
  public static async create(data: ICreateGenreArg): Promise<Page> {
    return prisma.page.create({
      data,
    });
  }
  public static async getTotal(chapterId: string): Promise<number> {
    return prisma.page.count({
      where: {
        chapterId,
      },
    });
  }
}
