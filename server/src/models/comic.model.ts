import { Comic } from '@prisma/client';

import prisma from '@/db/prisma';

type ICreateComic = Pick<Comic, 'title' | 'desc'> &
  Partial<Pick<Comic, 'img'>> & {
    authors: string[];
    genres: string[];
  };

export class ComicModel {
  public static async create({ authors, genres, ...data }: ICreateComic): Promise<Comic> {
    const authorsConnect = authors && authors.map((authorId) => ({ id: authorId }));
    const genresConnect = genres && genres.map((genreId) => ({ id: genreId }));

    return prisma.comic.create({
      data: {
        ...data,
        authors: {
          connect: authorsConnect,
        },
        genres: {
          connect: genresConnect,
        },
      },
      include: {
        authors: true,
        genres: true,
      },
    });
  }
  // public static async getAll()
}
