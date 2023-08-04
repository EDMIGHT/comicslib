import { Author } from '@prisma/client';

import prisma from '@/db/prisma';

type ICreateAuthorArg = Pick<Author, 'name' | 'login'>;

export class AuthorModel {
  public static async getAll(): Promise<Author[]> {
    return prisma.author.findMany();
  }
  public static async create(data: ICreateAuthorArg): Promise<Author> {
    return prisma.author.create({
      data,
    });
  }
}
