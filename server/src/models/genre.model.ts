import { Genre } from '@prisma/client';

import prisma from '@/db/prisma';

type ICreateGenreArg = Pick<Genre, 'title'>;

export class GenreModel {
  public static async getAll(): Promise<Genre[]> {
    return prisma.genre.findMany();
  }
  public static async create(data: ICreateGenreArg): Promise<Genre> {
    return prisma.genre.create({
      data,
    });
  }
}
