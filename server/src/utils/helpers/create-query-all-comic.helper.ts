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

  if (date === 'createdAt') {
    if (startDate && endDate) {
      dateFilter = Prisma.sql`
        AND Comic.created_at BETWEEN ${startDate} AND ${endDate}
      `;
    } else if (endDate) {
      dateFilter = Prisma.sql`
      AND Comic.created_at <= ${endDate}
      `;
    } else if (startDate) {
      dateFilter = Prisma.sql`
      AND Comic.created_at >= ${startDate}
      `;
    }
  } else if (date === 'updatedAt') {
    if (startDate && endDate) {
      dateFilter = Prisma.sql`
      AND Comic.updated_at BETWEEN ${startDate} AND ${endDate}
      `;
    } else if (endDate) {
      dateFilter = Prisma.sql`
      AND Comic.updated_at <= ${endDate}
      `;
    } else if (startDate) {
      dateFilter = Prisma.sql`
      AND Comic.updated_at >= ${startDate}
      `;
    }
  } else if (date === 'releasedAt') {
    if (startDate && endDate) {
      dateFilter = Prisma.sql`
      AND Comic.released_at BETWEEN ${startDate} AND ${endDate}
      `;
    } else if (endDate) {
      dateFilter = Prisma.sql`
      AND Comic.released_at <= ${endDate}
      `;
    } else if (startDate) {
      dateFilter = Prisma.sql`
      AND Comic.released_at >= ${startDate}
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
          INNER JOIN _comictogenre ON Genre.id = _comictogenre.B
          WHERE _comictogenre.A = Comic.id
          AND Genre.title IN (${Prisma.join(genres)})
          HAVING COUNT(DISTINCT Genre.title) >= ${genres.length}
        )`
      : Prisma.empty;
  const themesQuery =
    themes.length > 0
      ? Prisma.sql`AND EXISTS (
          SELECT 1
          FROM Theme
          INNER JOIN _comictotheme ON Theme.id = _comictotheme.B
          WHERE _comictotheme.A = Comic.id
          AND Theme.title IN (${Prisma.join(themes)})
          HAVING COUNT(DISTINCT Theme.title) >= ${themes.length}
        )`
      : Prisma.empty;
  const authorsQuery =
    authors.length > 0
      ? Prisma.sql`AND EXISTS (
          SELECT 1
          FROM Author
          INNER JOIN _authortocomic ON Author.id = _authortocomic.A
          WHERE _authortocomic.B = Comic.id
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
        INNER JOIN _comictofolder ON Folder.id = _comictofolder.B
        WHERE _comictofolder.A = Comic.id 
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
