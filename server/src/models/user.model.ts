import { User } from '@prisma/client';

import prisma from '@/db/prisma';

type ICreateUserArg = Omit<User, 'id'>;

export class UserModel {
  public static async getById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
  public static async getByLogin(login: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        login,
      },
    });
  }
  public static async create(data: ICreateUserArg): Promise<User> {
    return prisma.user.create({
      data,
    });
  }
}
