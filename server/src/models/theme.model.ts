import { Theme } from '@prisma/client';

import prisma from '@/db/prisma';

type ICreateThemeArg = Pick<Theme, 'title'>;

export class ThemeModel {
  public static async getAll(): Promise<Theme[]> {
    return prisma.theme.findMany();
  }
  public static async create(data: ICreateThemeArg): Promise<Theme> {
    return prisma.theme.create({
      data,
    });
  }
}
