import { Page } from '@prisma/client';

import prisma from '@/db/prisma';
import { IResponsePage } from '@/types/page.types';

type ICreateGenreArg = Page;
type IGetPageArg = Pick<Page, 'chapterId' | 'number'>;

export class PageModel {
  public static async get(data: IGetPageArg): Promise<IResponsePage | null> {
    return prisma.page.findFirst({
      where: data,
      include: {
        chapter: {
          include: {
            comic: {
              select: {
                id: true,
                title: true,
              },
            },
            user: {
              select: {
                id: true,
                login: true,
              },
            },
          },
        },
      },
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
