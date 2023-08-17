import { StatusName } from '@prisma/client';

import { IGetAllQuery } from '@/models/comic.model';

export type IAllComicQuery = {
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
  createdAt?: {
    gte?: Date;
    lte?: Date;
  };
  updatedAt?: {
    gte?: Date;
    lte?: Date;
  };
};

export const createQueryAllComic = ({
  genres,
  authors,
  statuses,
  folderId,
  ratedUser,
  date,
  startDate,
  endDate,
}: Omit<IGetAllQuery, 'title'>): IAllComicQuery => {
  const query: IAllComicQuery = {};

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
  if (date && startDate && endDate) {
    const index = date === 'createdAt' ? 'createdAt' : 'updatedAt';
    const modifyStartDate = new Date(startDate);
    modifyStartDate.setHours(0, 0, 0, 0);
    const modifyEndDate = new Date(endDate);
    modifyEndDate.setHours(23, 59, 59, 999);
    query[index] = {
      gte: new Date(modifyStartDate),
      lte: new Date(modifyEndDate),
    };
  } else if (date && startDate) {
    const index = date === 'createdAt' ? 'createdAt' : 'updatedAt';
    const modifyStartDate = new Date(startDate);
    modifyStartDate.setHours(0, 0, 0, 0);

    query[index] = {
      gte: new Date(modifyStartDate),
    };
  } else if (date && endDate) {
    const index = date === 'createdAt' ? 'createdAt' : 'updatedAt';
    const modifyEndDate = new Date(endDate);
    modifyEndDate.setHours(23, 59, 59, 999);

    query[index] = {
      lte: new Date(modifyEndDate),
    };
  }

  return query;
};
