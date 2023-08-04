import { Status } from '@prisma/client';

import prisma from '@/db/prisma';

type ICreateStatusArg = Pick<Status, 'name'>;

export class StatusModel {
  public static async getAll(): Promise<Status[]> {
    return prisma.status.findMany();
  }
  public static async create(data: ICreateStatusArg): Promise<Status> {
    return prisma.status.create({
      data,
    });
  }
}
