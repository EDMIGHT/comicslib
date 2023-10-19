import { Prisma } from '@prisma/client';
import { Sql } from '@prisma/client/runtime/library';

import { IGetAllQuery } from '@/models/comic.model';

export const createWhereQueryAllComics = ({
  title = '',
  authors = [],
  genres = [],
  themes = [],
  statuses = [],
  folderId,
  ratedUser,
  date,
  startDate,
  endDate,
}: IGetAllQuery): Sql => {
  const titleQuery = Prisma.sql`Comic.title LIKE ${`${title}%`} `;

  let dateFilter = Prisma.empty;

  const formattedStartDate = `${startDate} 00:00:00`;
  const formattedEndDate = `${endDate} 23:59:59`;

  if (date === 'createdAt') {
    if (startDate && endDate) {
      dateFilter = Prisma.sql`
        AND Comic.created_at BETWEEN ${formattedStartDate} AND ${formattedEndDate}
      `;
    } else if (endDate) {
      dateFilter = Prisma.sql`
      AND Comic.created_at <= ${formattedEndDate}
      `;
    } else if (startDate) {
      dateFilter = Prisma.sql`
      AND Comic.created_at >= ${formattedStartDate}
      `;
    }
  } else if (date === 'updatedAt') {
    if (startDate && endDate) {
      dateFilter = Prisma.sql`
      AND Comic.updated_at BETWEEN ${formattedStartDate} AND ${formattedEndDate}
      `;
    } else if (endDate) {
      dateFilter = Prisma.sql`
      AND Comic.updated_at <= ${formattedEndDate}
      `;
    } else if (startDate) {
      dateFilter = Prisma.sql`
      AND Comic.updated_at >= ${formattedStartDate}
      `;
    }
  } else if (date === 'releasedAt') {
    if (startDate && endDate) {
      dateFilter = Prisma.sql`
      AND Comic.released_at BETWEEN ${formattedStartDate} AND ${formattedEndDate}
      `;
    } else if (endDate) {
      dateFilter = Prisma.sql`
      AND Comic.released_at <= ${formattedEndDate}
      `;
    } else if (startDate) {
      dateFilter = Prisma.sql`
      AND Comic.released_at >= ${formattedStartDate}
      `;
    }
  }

  const statusQuery =
    statuses.length > 0
      ? Prisma.sql`AND Status.name IN (${Prisma.join(statuses)})`
      : Prisma.empty;
  const genresQuery =
    genres.length > 0
      ? Prisma.sql`AND EXISTS (
          SELECT 1
          FROM Genre
          INNER JOIN _ComicToGenre ON Genre.id = _ComicToGenre.B
          WHERE _ComicToGenre.A = Comic.id
          AND Genre.title IN (${Prisma.join(genres)})
          HAVING COUNT(DISTINCT Genre.title) >= ${genres.length}
        )`
      : Prisma.empty;
  const themesQuery =
    themes.length > 0
      ? Prisma.sql`AND EXISTS (
          SELECT 1
          FROM Theme
          INNER JOIN _ComicToTheme ON Theme.id = _ComicToTheme.B
          WHERE _ComicToTheme.A = Comic.id
          AND Theme.title IN (${Prisma.join(themes)})
          HAVING COUNT(DISTINCT Theme.title) >= ${themes.length}
        )`
      : Prisma.empty;
  const authorsQuery =
    authors.length > 0
      ? Prisma.sql`AND EXISTS (
          SELECT 1
          FROM Author
          INNER JOIN _AuthorToComic ON Author.id = _AuthorToComic.A
          WHERE _AuthorToComic.B = Comic.id
          AND Author.login IN (${Prisma.join(authors)})
          HAVING COUNT(DISTINCT Author.login) >= ${authors.length}
        )`
      : Prisma.empty;
  const ratedUserQuery = ratedUser
    ? Prisma.sql`
        AND EXISTS (
          SELECT 1
          FROM Rating
          INNER JOIN User ON Rating.user_id = User.id
          WHERE Rating.comic_id = Comic.id
          AND User.login = ${ratedUser}
        )
      `
    : Prisma.empty;
  const folderQuery = folderId
    ? Prisma.sql`
      AND EXISTS (
        SELECT 1
        FROM Folder
        INNER JOIN _ComicToFolder ON Folder.id = _ComicToFolder.B
        WHERE _ComicToFolder.A = Comic.id 
        AND Folder.id = ${folderId}
      )
    `
    : Prisma.empty;

  return Prisma.sql` 
  ${titleQuery} 
  ${statusQuery} 
  ${genresQuery} 
  ${themesQuery}
  ${authorsQuery}
  ${ratedUserQuery}
  ${folderQuery}
  ${dateFilter}`;
};
