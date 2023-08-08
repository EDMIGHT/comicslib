import { Folder } from '@prisma/client';

import prisma from '@/db/prisma';

type ICreateFolderArg = Pick<Folder, 'title' | 'userId'>;

export class FolderModel {
  public static async getAll(userId: string): Promise<Folder[]> {
    return prisma.folder.findMany({
      where: {
        userId,
      },
    });
  }
  public static async create(data: ICreateFolderArg): Promise<Folder> {
    return prisma.folder.create({
      data,
    });
  }
}
