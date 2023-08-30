import { Status, StatusName } from '@prisma/client';

import prisma from '@/db/prisma';

type ICreateStatusArg = Pick<Status, 'name'>;

export class StatusModel {
  public static async getAll(): Promise<Status[]> {
    return prisma.status.findMany();
  }
  public static async getByName(name: StatusName): Promise<Status | null> {
    return prisma.status.findFirst({
      where: {
        name,
      },
    });
  }
  public static async create(data: ICreateStatusArg): Promise<Status> {
    return prisma.status.create({
      data,
    });
  }
}
