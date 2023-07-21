import { User } from '@prisma/client';

import prisma from '@/db/prisma';

export class UserModel {
  public static async getById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
