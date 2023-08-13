import { Comic, StatusName } from '@prisma/client';

import prisma from '@/db/prisma';
import { IComicWithData } from '@/types/comic.types';
import { IPaginationArg, ISortArg } from '@/types/common.types';

const defaultComicImg = process.env.COMIC_DEFAULT_IMG_PATH;
const hostURL = `http://localhost:${process.env.PORT}/`;

const hostWithImgPath = hostURL + defaultComicImg;

type ICreateComic = Pick<Comic, 'title' | 'desc' | 'statusId'> &
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
      login: {
        in: string[];
      };
    };
  };
  status?: {
    name: {
      in: StatusName[];
    };
  };
  folders?: {
    some: {
      id: string;
    };
  };
  ratings?: {
    some: {
      user: {
        login: string;
      };
    };
  };
}

type IGetAllArg = {
  authors?: string[];
  genres?: string[];
  statuses?: string[];
  title: string;
  folderId?: string;
  ratedUser?: string;
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
    statuses,
    title,
    page,
    limit,
    order,
    sort,
    folderId,
    ratedUser,
  }: IGetAllArg): Promise<IComicWithData[]> {
    const query: IQuery = {};

    const offset = (+page - 1) * +limit;

    if (genres && genres.length > 0) {
      query.genres = {
        some: {
          title: {
            in: genres,
          },
        },
      };
    }
    if (authors && authors.length > 0) {
      query.authors = {
        some: {
          login: {
            in: authors,
          },
        },
      };
    }
    if (statuses && statuses.length > 0) {
      query.status = {
        name: {
          in: statuses as StatusName[],
        },
      };
    }
    if (folderId) {
      query.folders = {
        some: {
          id: folderId,
        },
      };
    }
    if (ratedUser) {
      query.ratings = {
        some: {
          user: {
            login: ratedUser,
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
          startsWith: title,
        },
      },

      include: {
        genres: true,
        authors: true,
        status: true,
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
    statuses,
    title,
    folderId,
  }: Partial<
    Pick<IGetAllArg, 'authors' | 'genres' | 'statuses' | 'title' | 'folderId'>
  >): Promise<number> {
    const query: IQuery = {};

    if (genres && genres.length > 0) {
      query.genres = {
        some: {
          title: {
            in: genres,
          },
        },
      };
    }
    if (authors && authors.length > 0) {
      query.authors = {
        some: {
          login: {
            in: authors,
          },
        },
      };
    }
    if (statuses && statuses.length > 0) {
      query.status = {
        name: {
          in: statuses as StatusName[],
        },
      };
    }
    if (folderId) {
      query.folders = {
        some: {
          id: folderId,
        },
      };
    }

    return prisma.comic.count({
      where: {
        ...query,
        title: {
          startsWith: title,
        },
      },
    });
  }
  public static async get(id: string): Promise<IComicWithData | null> {
    return prisma.comic.findUnique({
      where: {
        id,
      },
      include: {
        authors: true,
        genres: true,
        status: true,
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
  public static async getComicBySkip(skip: number): Promise<Comic | null> {
    return prisma.comic.findFirst({
      skip,
    });
  }
}
