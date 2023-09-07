import { Folder } from '@prisma/client';

import prisma from '@/db/prisma';
import {
  IFolderWithComicIds,
  IFolderWithShortComic,
  IResponseFolderWithData,
} from '@/types/folder.types';

type ICreateFolderArg = Pick<Folder, 'title' | 'userId' | 'order'> & {
  comics?: string[];
};
type IUpdateFolder = Pick<Folder, 'id' | 'title'> & {
  comics?: string[];
};
type IUpdateComicsArg = {
  id: string;
  prevComics: { id: string }[];
  newComics: { id: string }[];
};

export class FolderModel {
  public static async getAll(userId: string): Promise<Folder[]> {
    return prisma.folder.findMany({
      where: {
        userId,
      },
      orderBy: {
        order: 'asc',
      },
    });
  }
  public static async getAllByIds(ids: string[]): Promise<Folder[]> {
    return prisma.folder.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
  public static async getAllWithComics(userId: string): Promise<IFolderWithShortComic[]> {
    return prisma.folder.findMany({
      where: {
        userId,
      },
      orderBy: {
        order: 'asc',
      },
      include: {
        comics: {
          select: {
            id: true,
            title: true,
            img: true,
          },
          take: 10,
          orderBy: {
            updatedAt: 'desc',
          },
        },
        _count: {
          select: {
            comics: true,
          },
        },
      },
    });
  }
  public static getWithComicsIds(id: string): Promise<IFolderWithComicIds | null> {
    return prisma.folder.findFirst({
      where: {
        id,
      },
      include: {
        comics: {
          select: {
            id: true,
          },
        },
      },
    });
  }
  public static async getById(id: string): Promise<IResponseFolderWithData | null> {
    return prisma.folder.findFirst({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            id: true,
            login: true,
            img: true,
          },
        },
        _count: {
          select: {
            comics: true,
          },
        },
      },
    });
  }
  public static async getByLogin(
    login: string,
    comicId: string
  ): Promise<IFolderWithComicIds[]> {
    return prisma.folder.findMany({
      where: {
        user: {
          login,
        },
      },
      include: {
        comics: {
          where: {
            id: comicId,
          },
          select: {
            id: true,
          },
        },
      },
    });
  }
  public static async getTotalUserFolders(userId: string): Promise<number> {
    return prisma.folder.count({
      where: {
        userId,
      },
    });
  }
  public static async create({ comics, ...data }: ICreateFolderArg): Promise<Folder> {
    const comicsConnect = comics && comics.map((comic) => ({ id: comic }));
    return prisma.folder.create({
      data: {
        ...data,
        comics: {
          connect: comicsConnect,
        },
      },
    });
  }
  public static async update({ id, title, comics }: IUpdateFolder): Promise<Folder> {
    const comicsDisconnect = comics && comics.map((comic) => ({ id: comic }));
    return prisma.folder.update({
      where: {
        id,
      },
      data: {
        title,
        comics: {
          disconnect: comicsDisconnect,
        },
      },
    });
  }
  public static async updateOrder({
    id,
    order,
  }: Pick<Folder, 'id' | 'order'>): Promise<Folder> {
    return prisma.folder.update({
      where: {
        id,
      },
      data: {
        order,
      },
    });
  }
  public static async updateComics({
    id,
    newComics,
    prevComics,
  }: IUpdateComicsArg): Promise<Folder> {
    return prisma.folder.update({
      where: {
        id,
      },
      data: {
        comics: {
          disconnect: prevComics,
          connect: newComics,
        },
      },
    });
  }
  public static async deleteById(id: string): Promise<Folder> {
    return prisma.folder.delete({
      where: {
        id,
      },
    });
  }
}
