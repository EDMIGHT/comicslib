import { Rating } from '@prisma/client';

import prisma from '@/db/prisma';

type ICreateGenreArg = Pick<Rating, 'comicId' | 'userId' | 'value'>;
type IUpdateRatingArg = Pick<Rating, 'id' | 'value'>;

export class RatingModel {
  public static async getAll(comicId: string): Promise<Rating[]> {
    return prisma.rating.findMany({
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
  public static async update({ id, value }: IUpdateRatingArg): Promise<Rating> {
    return prisma.rating.update({
      where: {
        id,
      },
      data: {
        value,
      },
    });
  }
  public static async delete(id: string): Promise<Rating> {
    return prisma.rating.delete({
      where: {
        id,
      },
    });
  }
}
