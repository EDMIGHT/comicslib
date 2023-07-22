import { Author } from '@prisma/client';

import prisma from '@/db/prisma';

type ICreateAuthorArg = Pick<Author, 'name'>;

export class AuthorModel {
  public static async create(data: ICreateAuthorArg): Promise<Author> {
    return prisma.author.create({
      data,
    });
  }
}
