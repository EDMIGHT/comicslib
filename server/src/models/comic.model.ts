import { Comic, Prisma } from '@prisma/client';
import { Sql } from '@prisma/client/runtime/library';

import prisma from '@/db/prisma';
import { IComicWithChapter, IComicWithData, IComicWithDataSingle } from '@/types/comic.types';
import { IPaginationArg, ISortArg } from '@/types/common.types';
import { createWhereQueryAllComics } from '@/utils/helpers/create-query-all-comic.helper';

type ICreateComic = Pick<Comic, 'title' | 'desc' | 'statusId' | 'img' | 'releasedAt'> & {
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
    title?: string;
    login: string;
  };

type IGetAllSubscribedComics = ISortArg &
  IPaginationArg & {
    userId: string;
    title?: string;
  };

const comicSchema = prisma.comic.fields;

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
        img: data.img,

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
    page,
    limit,
    order,
    sort,
    ...whereQueryArgs
  }: IGetAllArg): Promise<IComicWithData[]> {
    const offset = (+page - 1) * +limit;

    const whereQuery = createWhereQueryAllComics({ ...whereQueryArgs });

    const inOrder: Sql = order === 'desc' ? Prisma.sql`DESC` : Prisma.sql`ASC`;

    // ? can I optimize it somehow?
    let sortBy: Sql;
    switch (sort) {
      case 'best': {
        sortBy = Prisma.sql`avg_rating`;
        break;
      }
      case 'popular': {
        sortBy = Prisma.sql`unique_bookmarks_count`;
        break;
      }
      case comicSchema.title.name: {
        sortBy = Prisma.sql`Comic.title`;
        break;
      }
      case comicSchema.createdAt.name: {
        sortBy = Prisma.sql`Comic.created_at`;
        break;
      }
      case comicSchema.updatedAt.name: {
        sortBy = Prisma.sql`Comic.updated_at`;
        break;
      }
      case comicSchema.releasedAt.name: {
        sortBy = Prisma.sql`Comic.released_at`;
        break;
      }
      default:
        sortBy = Prisma.sql`Comic.created_at`;
    }

    const orderQuery = Prisma.sql`ORDER BY ${sortBy} ${inOrder}, Comic.id ASC`;

    const comics = await prisma.$queryRaw<IComicWithData[]>`
    SELECT
      Comic.*,
      AVG(Rating.value) as avg_rating,
      CAST(COUNT(DISTINCT Bookmark.user_id) AS DECIMAL(10, 0)) as unique_bookmarks_count,
      CAST(COUNT(Comment.id) AS DECIMAL(10, 0)) as comments_count,
      COALESCE(
      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('id', Genre.id, 'title', Genre.title))
        FROM Genre
        INNER JOIN _comictogenre ON Genre.id = _comictogenre.B
        WHERE _comictogenre.A = Comic.id
      ),
        JSON_ARRAY()
      ) as genres,
      COALESCE(
      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('id', Theme.id, 'title', Theme.title))
        FROM Theme
        INNER JOIN _comictotheme ON Theme.id = _comictotheme.B
        WHERE _comictotheme.A = Comic.id
      ),
        JSON_ARRAY()
      ) as themes,
      COALESCE(
      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('id', Author.id, 'login', Author.login, 'name', Author.name))
        FROM Author
        INNER JOIN _authortocomic ON Author.id = _authortocomic.A
        WHERE _authortocomic.B = Comic.id
      ),
        JSON_ARRAY()
      ) as authors,
      JSON_OBJECT('id', Status.id, 'name', Status.name) as status
    FROM Comic
    LEFT JOIN Rating ON Comic.id = Rating.comic_id
    LEFT JOIN Bookmark ON Comic.id = Bookmark.comic_id
    LEFT JOIN Comment ON Comic.id = Comment.comic_id
    LEFT JOIN Status ON Comic.status_id = Status.id
    WHERE ${whereQuery}
    GROUP BY Comic.id
    ${orderQuery}
    LIMIT ${Number(limit)} OFFSET ${offset}
  `;

    comics.forEach((comic) => {
      comic.avg_rating = Number(comic.avg_rating);
      comic.unique_bookmarks_count = Number(comic.unique_bookmarks_count);
      comic.comments_count = Number(comic.comments_count);
    });

    return comics;
  }
  public static async getAllCount({ ...whereQueryArgs }: IGetAllQuery): Promise<number> {
    const whereQuery = createWhereQueryAllComics({ ...whereQueryArgs });

    const countQuery = await prisma.$queryRaw<{ count: number }[]>`
    SELECT CAST(COUNT(DISTINCT Comic.id) AS DECIMAL(10, 0)) as count
    FROM Comic
    LEFT JOIN Rating ON Comic.id = Rating.comic_id
    LEFT JOIN Bookmark ON Comic.id = Bookmark.comic_id
    LEFT JOIN Comment ON Comic.id = Comment.comic_id
    LEFT JOIN Status ON Comic.status_id = Status.id
    WHERE ${whereQuery}
  `;

    return countQuery[0].count || 0;
  }
  public static async get(id: string): Promise<IComicWithDataSingle | null> {
    const [comic] = await prisma.$queryRaw<IComicWithDataSingle[]>`
    SELECT
      Comic.*,
      AVG(Rating.value) as avg_rating,
      CAST(COUNT(DISTINCT Bookmark.user_id) AS DECIMAL(10, 0)) as unique_bookmarks_count,
      CAST(COUNT(Comment.id) AS DECIMAL(10, 0)) as comments_count,
      COALESCE(
      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('id', Genre.id, 'title', Genre.title))
        FROM Genre
        INNER JOIN _comictogenre ON Genre.id = _comictogenre.B
        WHERE _comictogenre.A = Comic.id
      ),
        JSON_ARRAY()
      ) as genres,
      COALESCE(
      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('id', Theme.id, 'title', Theme.title))
        FROM Theme
        INNER JOIN _comictotheme ON Theme.id = _comictotheme.B
        WHERE _comictotheme.A = Comic.id
      ),
        JSON_ARRAY()
      ) as themes,
      COALESCE(
      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('id', Author.id, 'login', Author.login, 'name', Author.name))
        FROM Author
        INNER JOIN _authortocomic ON Author.id = _authortocomic.A
        WHERE _authortocomic.B = Comic.id
      ),
        JSON_ARRAY()
      ) as authors,
      JSON_OBJECT('id', Status.id, 'name', Status.name) as status,
      (
        SELECT JSON_OBJECT('id', Chapter.id, 'number', Chapter.number, 'title', Chapter.title)
        FROM Chapter
        WHERE Chapter.comic_id = Comic.id
        ORDER BY Chapter.number ASC
        LIMIT 1
      ) as first_chapter
    FROM Comic
    LEFT JOIN Rating ON Comic.id = Rating.comic_id
    LEFT JOIN Bookmark ON Comic.id = Bookmark.comic_id
    LEFT JOIN Comment ON Comic.id = Comment.comic_id
    LEFT JOIN Status ON Comic.status_id = Status.id
    WHERE Comic.id = ${id}
    GROUP BY Comic.id
  `;

    if (!comic) {
      return null;
    }

    comic.avg_rating = Number(comic.avg_rating);
    comic.unique_bookmarks_count = Number(comic.unique_bookmarks_count);
    comic.comments_count = Number(comic.comments_count);

    return comic;
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
  public static async getAllByIds(ids: string[]): Promise<Comic[]> {
    return prisma.comic.findMany({
      where: {
        id: {
          in: ids,
        },
      },
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
                _count: {
                  select: {
                    chapters: true,
                    comments: true,
                    ratings: true,
                  },
                },
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
    login,
    title,
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
              login,
            },
          },
        },
        title: {
          startsWith: title,
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
                _count: {
                  select: {
                    chapters: true,
                    comments: true,
                    ratings: true,
                  },
                },
              },
            },
          },
          orderBy: {
            number: 'desc',
          },
        },
      },
    });
  }
  public static async getAllCountUploadedByUser(login: string): Promise<number> {
    return prisma.comic.count({
      where: {
        chapters: {
          some: {
            user: {
              login,
            },
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
