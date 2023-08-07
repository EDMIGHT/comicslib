import { User } from '@prisma/client';

import prisma from '@/db/prisma';
import { IProfile } from '@/types/user.types';

type ICreateUserArg = Omit<User, 'id'>;

const defaultUserImg = process.env.USER_DEFAULT_IMG_PATH;
const hostURL = `http://localhost:${process.env.PORT}/`;

const hostWithImgPath = hostURL + defaultUserImg;

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
  public static async getByLoginWithData(login: string): Promise<IProfile | null> {
    return prisma.user.findFirst({
      where: {
        login,
      },
      include: {
        folders: true,
        _count: {
          select: {
            ratings: true,
            chapters: true,
            readingHistory: true,
          },
        },
      },
    });
  }
  public static async create(data: ICreateUserArg): Promise<User> {
    return prisma.user.create({
      data: {
        ...data,
        img: data.img || hostWithImgPath,
      },
    });
  }
}
