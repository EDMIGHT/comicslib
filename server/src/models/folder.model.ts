import { Folder } from '@prisma/client';

import prisma from '@/db/prisma';

type ICreateFolderArg = Pick<Folder, 'title' | 'userId'> & {
  comics?: string[];
};

export class FolderModel {
  public static async getAll(userId: string): Promise<Folder[]> {
    return prisma.folder.findMany({
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
}
