import { Comic, Prisma } from '@prisma/client';

import prisma from '@/db/prisma';
import { IComicWithChapter, IComicWithData } from '@/types/comic.types';
import { IPaginationArg, ISortArg, ISortOrder } from '@/types/common.types';
import {
  createQueryAllComic,
  IAllComicQuery,
} from '@/utils/helpers/create-query-all-comic.helper';

const defaultComicImg = process.env.COMIC_DEFAULT_IMG_PATH;
const hostURL = `http://localhost:${process.env.PORT}/`;

const hostWithImgPath = hostURL + defaultComicImg;

type ICreateComic = Pick<Comic, 'title' | 'desc' | 'statusId' | 'releasedAt'> &
  Partial<Pick<Comic, 'img'>> & {
    authors: string[];
    genres: string[];
    themes: string[];
  };

export type IGetAllQuery = {
  authors?: string[];
  themes?: string[];
  genres?: string[];
  statuses?: string[];
  title: string;
  folderId?: string;
  ratedUser?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
};

type IGetAllArg = IGetAllQuery & ISortArg & IPaginationArg;

type IGetAllUploadedArg = ISortArg &
  IPaginationArg & {
    userLogin: string;
  };

type IGetAllSubscribedComics = ISortArg &
  IPaginationArg & {
    userId: string;
    title?: string;
  };

export class ComicModel {
  public static async create({
    authors,
    genres,
    themes,
    ...data
  }: ICreateComic): Promise<Comic> {
    const authorsConnect = authors && authors.map((authorLogin) => ({ login: authorLogin }));
    const genresConnect = genres && genres.map((genreId) => ({ title: genreId }));
    const themesConnect = themes && themes.map((themeId) => ({ title: themeId }));

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
        themes: {
          connect: themesConnect,
        },
      },
      include: {
        authors: true,
        genres: true,
      },
    });
  }
  public static async getAll({
    title,
    page,
    limit,
    order,
    sort,
    ...queryArgs
  }: IGetAllArg): Promise<IComicWithData[]> {
    const whereQuery: IAllComicQuery = createQueryAllComic({ ...queryArgs });

    const sortQuery: Prisma.ComicOrderByWithRelationInput[] = [];

    if (sort === 'best') {
      sortQuery.push({
        bookmarks: {
          _count: 'desc' as ISortOrder,
        },
      });
    } else if (sort === 'title') {
      sortQuery.push(
        {
          title: order,
        },
        {
          id: 'desc' as ISortOrder,
        }
      );
    } else {
      sortQuery.push({
        [sort]: order,
      });
    }

    const offset = (+page - 1) * +limit;

    return prisma.comic.findMany({
      skip: offset,
      take: limit,
      orderBy: sortQuery,
      where: {
        ...whereQuery,
        title: {
          startsWith: title,
        },
      },

      include: {
        genres: true,
        themes: true,
        authors: true,
        status: true,
        _count: {
          select: {
            comments: true,
          },
        },
        chapters: {
          orderBy: {
            number: 'asc',
          },
          take: 1,
        },
      },
    });
  }
  public static async getAllCount({
    title,
    ...queryArgs
  }: Partial<IGetAllQuery>): Promise<number> {
    const query: IAllComicQuery = createQueryAllComic({ ...queryArgs });

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
        themes: true,
        genres: true,
        status: true,
        _count: {
          select: {
            comments: true,
          },
        },
        chapters: {
          orderBy: {
            number: 'asc',
          },
          take: 1,
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
  public static async getUniqueSubscribes(id: string): Promise<number> {
    const uniqueUsers = await prisma.user.count({
      where: {
        folders: {
          some: {
            comics: {
              some: {
                id,
              },
            },
          },
        },
      },
    });

    return uniqueUsers;
  }
  public static async getComicBySkip(skip: number): Promise<Comic | null> {
    return prisma.comic.findFirst({
      skip,
    });
  }
  public static async getAllSubscribedComics({
    userId,
    title,
    page,
    limit,
    sort,
    order,
  }: IGetAllSubscribedComics): Promise<IComicWithChapter[]> {
    const offset = (page - 1) * limit;

    const today = new Date(); // Текущая дата и время
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 30); // Вычитаем 7 дней

    return prisma.comic.findMany({
      where: {
        folders: {
          some: {
            userId,
          },
        },
        updatedAt: {
          gt: sevenDaysAgo,
        },
        title: {
          startsWith: title,
        },
      },
      include: {
        chapters: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 3,
          include: {
            user: {
              select: {
                id: true,
                login: true,
                img: true,
              },
            },
          },
        },
      },
      skip: offset,
      take: limit,
      orderBy: {
        [sort]: order,
      },
    });
  }
  public static getAllCountSubscribedComic({
    userId,
    title,
  }: Pick<IGetAllSubscribedComics, 'title' | 'userId'>): Promise<number> {
    return prisma.comic.count({
      where: {
        folders: {
          some: {
            userId,
          },
        },
        title: {
          startsWith: title,
        },
      },
    });
  }
  public static async getAllUploadedByUser({
    userLogin,
    limit,
    page,
    sort,
    order,
  }: IGetAllUploadedArg): Promise<IComicWithChapter[]> {
    const offset = (page - 1) * limit;

    return prisma.comic.findMany({
      skip: offset,
      take: limit,
      where: {
        chapters: {
          some: {
            user: {
              login: userLogin,
            },
          },
        },
      },
      orderBy: {
        [sort]: order,
      },
      include: {
        chapters: {
          include: {
            user: {
              select: {
                id: true,
                login: true,
                img: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }
  public static async refreshUpdatedAt(comicId: string): Promise<Comic> {
    return prisma.comic.update({
      where: {
        id: comicId,
      },
      data: {
        updatedAt: new Date(),
      },
    });
  }
}
