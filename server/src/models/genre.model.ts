import { Genre } from '@prisma/client';

import prisma from '@/db/prisma';

type ICreateGenreArg = Pick<Genre, 'title'>;

export class GenreModel {
  public static async create(data: ICreateGenreArg) {
    return prisma.genre.create({
      data,
    });
  }
}
