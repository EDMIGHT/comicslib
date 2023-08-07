import { Rating } from '@prisma/client';

import prisma from '@/db/prisma';

type ICreateGenreArg = Pick<Rating, 'comicId' | 'userId' | 'value'>;
type IUpdateRatingArg = Pick<Rating, 'id'> & Partial<ICreateGenreArg>;

export class RatingModel {
  public static async getAll(comicId: string): Promise<Rating[]> {
    return prisma.rating.findMany({
      where: {
        comicId,
      },
    });
  }
  public static async get(comicId: string): Promise<Rating | null> {
    return prisma.rating.findFirst({
      where: {
        comicId,
      },
    });
  }
  public static async getByUserId(comicId: string, userId: string): Promise<Rating | null> {
    return prisma.rating.findFirst({
      where: {
        comicId,
        userId,
      },
    });
  }
  public static async create(data: ICreateGenreArg): Promise<Rating> {
    return prisma.rating.create({
      data,
    });
  }
  public static async update({ id, ...data }: IUpdateRatingArg): Promise<Rating> {
    return prisma.rating.update({
      where: {
        id,
      },
      data,
    });
  }
}
