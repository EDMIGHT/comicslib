import { User } from '@prisma/client';

import { DEFAULT_USER_FOLDER } from '@/configs/user.configs';
import prisma from '@/db/prisma';
import { IPaginationArg, ISortArg } from '@/types/common.types';
import { IProfile } from '@/types/user.types';

type ICreateUserArg = Pick<User, 'login' | 'password' | 'name'>;

const defaultUserImg = process.env.USER_DEFAULT_IMG_PATH!;

type IGetAllArg = ISortArg &
  IPaginationArg & {
    login: string;
  };

type IUpdateUser = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>> & Pick<User, 'id'>;

export class UserModel {
  public static async getAll({
    login,
    page,
    limit,
    sort,
    order,
  }: IGetAllArg): Promise<User[]> {
    const offset = (page - 1) * limit;
    return prisma.user.findMany({
      where: {
        login: {
          startsWith: login,
        },
      },
      orderBy: {
        [sort as string]: order,
      },
      take: limit,
      skip: offset,
      include: {
        _count: {
          select: {
            ratings: true,
            comments: true,
          },
        },
      },
    });
  }
  public static async getAllCount(login: string): Promise<number> {
    return prisma.user.count({
      where: {
        login,
      },
    });
  }
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
            bookmarks: true,
          },
        },
      },
    });
  }
  public static async create(data: ICreateUserArg): Promise<User> {
    return prisma.user.create({
      data: {
        ...data,
        img: defaultUserImg,
        folders: {
          create: DEFAULT_USER_FOLDER,
        },
      },
    });
  }
  public static async update({ id, ...data }: IUpdateUser): Promise<User> {
    return prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }
}
