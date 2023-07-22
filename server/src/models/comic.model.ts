import { Comic } from '@prisma/client';

import prisma from '@/db/prisma';

type ICreateComic = Pick<Comic, 'title' | 'desc'> & Partial<Pick<Comic, 'img'>>;

export class ComicModel {
  public static async create(data: ICreateComic): Promise<Comic> {
    return prisma.comic.create({
      data,
    });
  }
}
