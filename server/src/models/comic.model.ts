import { Comic } from '@prisma/client';

import prisma from '@/db/prisma';

type ICreateComic = Pick<Comic, 'title' | 'desc'> &
  Partial<Pick<Comic, 'img'>> & {
    authors: string[];
    genres: string[];
  };

interface IQuery {
  genres?: {
    some: {
      title: {
        in: string[];
      };
    };
  };
  authors?: {
    some: {
      id: {
        in: string[];
      };
    };
  };
}

interface IGetAllArg {
  authors: string[];
  genres: string[];
  page: number;
  limit: number;
  order: string;
  sort: string;
}

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
  public static async getAll({ authors, genres, page, limit, order, sort }: IGetAllArg) {
    const query: IQuery = {};

    const offset = (+page - 1) * +limit;

    if (genres.length > 0) {
      query.genres = {
        some: {
          title: {
            in: genres,
          },
        },
      };
    }
    if (authors.length > 0) {
      query.authors = {
        some: {
          id: {
            in: authors,
          },
        },
      };
    }

    return prisma.comic.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        [sort as string]: order,
      },
      where: {
        ...query,
      },
      include: {
        genres: true,
        authors: true,
        _count: {
          select: {
            comments: true,
            folders: true,
          },
        },
      },
    });
  }
  public static async getAllCount({
    genres,
    authors,
  }: Pick<IGetAllArg, 'authors' | 'genres'>): Promise<number> {
    const query: IQuery = {};

    if (genres.length > 0) {
      query.genres = {
        some: {
          title: {
            in: genres,
          },
        },
      };
    }
    if (authors.length > 0) {
      query.authors = {
        some: {
          id: {
            in: authors,
          },
        },
      };
    }

    return prisma.comic.count({
      where: {
        ...query,
      },
    });
  }
}
