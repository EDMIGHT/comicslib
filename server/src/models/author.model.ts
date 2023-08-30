import { Author } from '@prisma/client';

import prisma from '@/db/prisma';
import { IPaginationArg, ISortArg } from '@/types/common.types';

type ICreateAuthorArg = Pick<Author, 'name' | 'login'>;

type IGetAllAuthorsArg = ISortArg &
  IPaginationArg & {
    login: string;
  };

export class AuthorModel {
  public static async getAll({
    login,
    page,
    limit,
    order,
    sort,
  }: IGetAllAuthorsArg): Promise<Author[]> {
    const offset = (+page - 1) * +limit;
    return prisma.author.findMany({
      take: limit,
      skip: offset,
      where: {
        login: {
          startsWith: login,
        },
      },
      orderBy: {
        [sort]: order,
      },
    });
  }
  public static async getTotalAll({
    login,
  }: Pick<IGetAllAuthorsArg, 'login'>): Promise<number> {
    return prisma.author.count({
      where: {
        login: {
          startsWith: login,
        },
      },
    });
  }
  public static async getByLogin(login: string): Promise<Author | null> {
    return prisma.author.findFirst({
      where: {
        login,
      },
    });
  }
  public static async create(data: ICreateAuthorArg): Promise<Author> {
    return prisma.author.create({
      data,
    });
  }
}
