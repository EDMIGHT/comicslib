import { Comic } from '@prisma/client';

import prisma from '@/db/prisma';
import { IComicWithData, IComicWithDataSingle } from '@/types/comic.types';
import { IPaginationArg, ISortArg } from '@/types/common.types';

const defaultComicImg = process.env.COMIC_DEFAULT_IMG_PATH;
const hostURL = `http://localhost:${process.env.PORT}/`;

const hostWithImgPath = hostURL + defaultComicImg;

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

type IGetAllArg = {
  authors: string[];
  genres: string[];
  title: string;
} & ISortArg &
  IPaginationArg;

export class ComicModel {
  public static async create({ authors, genres, ...data }: ICreateComic): Promise<Comic> {
    const authorsConnect = authors && authors.map((authorId) => ({ id: authorId }));
    const genresConnect = genres && genres.map((genreId) => ({ id: genreId }));

    return prisma.comic.create({
      data: {
        ...data,
        img: data.img || hostWithImgPath,
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
  public static async getAll({
    authors,
    genres,
    title,
    page,
    limit,
    order,
    sort,
  }: IGetAllArg): Promise<IComicWithData[]> {
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
        title: {
          contains: title,
        },
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
    title,
  }: Pick<IGetAllArg, 'authors' | 'genres' | 'title'>): Promise<number> {
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
        title: {
          contains: title,
        },
      },
    });
  }
  public static async get(id: string): Promise<IComicWithDataSingle | null> {
    return prisma.comic.findUnique({
      where: {
        id,
      },
      include: {
        authors: true,
        genres: true,
        comments: true,
        _count: {
          select: {
            comments: true,
            folders: true,
            ratings: true,
          },
        },
      },
    });
  }
  public static async getAvgRating(id: string): Promise<number | null> {
    const avgRating = await prisma.rating.aggregate({
      where: {
        comicId: id,
      },
      _avg: {
        value: true,
      },
    });

    return avgRating._avg?.value || null;
  }
}
