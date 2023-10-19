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
  title?: string;
  folderId?: string;
  ratedUser?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
};

type IGetAllArg = IGetAllQuery & ISortArg & IPaginationArg;

type IGetAllComicsWithChaptersArg = ISortArg &
  IPaginationArg & {
    title?: string;
    login?: string;
    type?: 'uploadedBy' | 'subscribedBy';
  };

type IQueryGetAllComicsWithChaptersArg = {
  chapters?: {
    some: {
      user: {
        login: string;
      };
    };
  };
  folders?: {
    some: {
      user: {
        login: string;
      };
    };
  };
  title?: {
    startsWith: string;
  };
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

    const sortOptions = {
      best: Prisma.sql`avg_rating`,
      popular: Prisma.sql`unique_bookmarks_count`,
      [comicSchema.title.name]: Prisma.sql`Comic.title`,
      [comicSchema.createdAt.name]: Prisma.sql`Comic.created_at`,
      [comicSchema.updatedAt.name]: Prisma.sql`Comic.updated_at`,
      [comicSchema.releasedAt.name]: Prisma.sql`Comic.released_at`,
    };

    const sortBy: Sql = sortOptions[sort] || Prisma.sql`Comic.created_at`;
    const orderQuery = Prisma.sql`ORDER BY ${sortBy} ${inOrder}, Comic.id ASC`;

    const comics = await prisma.$queryRaw<IComicWithData[]>`
    SELECT
      Comic.id, 
      Comic.title,
      Comic.desc,
      Comic.img,
      Comic.status_id AS statusId,
      Comic.created_at AS createdAt,
      Comic.released_at as releasedAt,
      Comic.updated_at as updatedAt,
      AVG(Rating.value) as avg_rating,
      CAST(COUNT(DISTINCT Bookmark.user_id) AS DECIMAL(10, 0)) as unique_bookmarks_count,
      COALESCE((SELECT COUNT(*) FROM Comment WHERE Comment.comic_id = Comic.id), 0) as comments_count,
      COALESCE(
      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('id', Genre.id, 'title', Genre.title))
        FROM Genre
        INNER JOIN _ComicToGenre ON Genre.id = _ComicToGenre.B
        WHERE _ComicToGenre.A = Comic.id
      ),
        JSON_ARRAY()
      ) as genres,
      COALESCE(
      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('id', Theme.id, 'title', Theme.title))
        FROM Theme
        INNER JOIN _ComicToTheme ON Theme.id = _ComicToTheme.B
        WHERE _ComicToTheme.A = Comic.id
      ),
        JSON_ARRAY()
      ) as themes,
      COALESCE(
      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('id', Author.id, 'login', Author.login, 'name', Author.name))
        FROM Author
        INNER JOIN _AuthorToComic ON Author.id = _AuthorToComic.A
        WHERE _AuthorToComic.B = Comic.id
      ),
        JSON_ARRAY()
      ) as authors,
      JSON_OBJECT('id', Status.id, 'name', Status.name) as status
    FROM Comic
    LEFT JOIN Rating ON Comic.id = Rating.comic_id
    LEFT JOIN Bookmark ON Comic.id = Bookmark.comic_id
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
    LEFT JOIN Status ON Comic.status_id = Status.id
    WHERE ${whereQuery}
  `;

    return countQuery[0].count || 0;
  }
  public static async get(id: string): Promise<IComicWithDataSingle | null> {
    const [comic] = await prisma.$queryRaw<IComicWithDataSingle[]>`
    SELECT
      Comic.id, 
      Comic.title,
      Comic.desc,
      Comic.img,
      Comic.status_id AS statusId,
      Comic.created_at AS createdAt,
      Comic.released_at as releasedAt,
      Comic.updated_at as updatedAt,
      AVG(Rating.value) as avg_rating,
      CAST(COUNT(DISTINCT Bookmark.user_id) AS DECIMAL(10, 0)) as unique_bookmarks_count,
      COALESCE((SELECT COUNT(*) FROM Comment WHERE Comment.comic_id = Comic.id), 0) as comments_count,
      COALESCE(
      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('id', Genre.id, 'title', Genre.title))
        FROM Genre
        INNER JOIN _ComicToGenre ON Genre.id = _ComicToGenre.B
        WHERE _ComicToGenre.A = Comic.id
      ),
        JSON_ARRAY()
      ) as genres,
      COALESCE(
      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('id', Theme.id, 'title', Theme.title))
        FROM Theme
        INNER JOIN _ComicToTheme ON Theme.id = _ComicToTheme.B
        WHERE _ComicToTheme.A = Comic.id
      ),
        JSON_ARRAY()
      ) as themes,
      COALESCE(
      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('id', Author.id, 'login', Author.login, 'name', Author.name))
        FROM Author
        INNER JOIN _AuthorToComic ON Author.id = _AuthorToComic.A
        WHERE _AuthorToComic.B = Comic.id
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
  public static async getAllWithChapters({
    login,
    title,
    limit,
    page,
    sort,
    order,
    type,
  }: IGetAllComicsWithChaptersArg): Promise<IComicWithChapter[]> {
    const offset = (page - 1) * limit;
    const query: IQueryGetAllComicsWithChaptersArg = {};

    if (login && type === 'uploadedBy') {
      query.chapters = {
        some: {
          user: {
            login,
          },
        },
      };
    } else if (login && type === 'subscribedBy') {
      query.folders = {
        some: {
          user: {
            login,
          },
        },
      };
    }

    return prisma.comic.findMany({
      skip: offset,
      take: limit,

      where: {
        title: {
          startsWith: title,
        },
        chapters: {
          some: {
            id: {
              not: {
                equals: undefined,
              },
            },
          },
        },
        ...query,
      },
      orderBy: {
        [sort]: order,
      },
      include: {
        chapters: {
          take: 10,
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
            createdAt: 'desc',
          },
        },
        authors: true,
      },
    });
  }
  public static async getAllCountWithChapters({
    login,
    type,
    title,
  }: Pick<IGetAllComicsWithChaptersArg, 'login' | 'type' | 'title'>): Promise<number> {
    const query: IQueryGetAllComicsWithChaptersArg = {};

    if (login && type === 'uploadedBy') {
      query.chapters = {
        some: {
          user: {
            login,
          },
        },
      };
    } else if (login && type === 'subscribedBy') {
      query.folders = {
        some: {
          user: {
            login,
          },
        },
      };
    }

    return prisma.comic.count({
      where: {
        title: {
          startsWith: title,
        },
        ...query,
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
