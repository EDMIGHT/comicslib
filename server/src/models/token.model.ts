import { Token } from '@prisma/client';

import prisma from '@/db/prisma';

type ICreateTokenArg = Pick<Token, 'userId' | 'refreshToken'>;

export class TokenModel {
  public static async getByUserId(userId: string): Promise<Token | null> {
    return prisma.token.findUnique({
      where: {
        userId,
      },
    });
  }
  public static async getByRefreshToken(refreshToken: string): Promise<Token | null> {
    return prisma.token.findFirst({
      where: {
        refreshToken,
      },
    });
  }
  public static async create({ userId, refreshToken }: ICreateTokenArg): Promise<Token> {
    return prisma.token.create({
      data: {
        userId,
        refreshToken,
      },
    });
  }
  public static async update({ userId, refreshToken }: ICreateTokenArg): Promise<Token> {
    return prisma.token.update({
      where: {
        userId,
      },
      data: {
        refreshToken,
      },
    });
  }
}
