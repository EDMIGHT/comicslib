import { Session } from '@prisma/client';

import prisma from '@/db/prisma';

type ICreateTokenArg = Pick<Session, 'userId' | 'refreshToken'>;

export class SessionModel {
  public static async getByUserId(userId: string): Promise<Session | null> {
    return prisma.session.findUnique({
      where: {
        userId,
      },
    });
  }
  public static async getByRefreshToken(refreshToken: string): Promise<Session | null> {
    return prisma.session.findFirst({
      where: {
        refreshToken,
      },
    });
  }
  public static async create(data: ICreateTokenArg): Promise<Session> {
    return prisma.session.create({
      data,
    });
  }
  public static async update({ userId, refreshToken }: ICreateTokenArg): Promise<Session> {
    return prisma.session.update({
      where: {
        userId,
      },
      data: {
        refreshToken,
      },
    });
  }
}
