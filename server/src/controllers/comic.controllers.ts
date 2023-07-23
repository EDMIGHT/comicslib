import { Request, Response } from 'express';

import { ComicModel } from '@/models/comic.model';
import { CustomResponse } from '@/utils/helpers/customResponse';
import { serverErrorResponse } from '@/utils/helpers/serverErrorResponse';

export const createComic = async (req: Request, res: Response): Promise<Response> => {
  try {
    const comic = await ComicModel.create({ ...req.body });

    return CustomResponse.created(res, comic);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error when creating a comic on the server side',
      error,
    });
  }
};

export const getComics = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      genres,
      authors,
      title,
      page = 1,
      limit = 10,
      order = 'desc',
      sort = 'createdAt',
    } = req.query;

    const genresList = genres ? (genres as string).split(',') : [];
    const authorsList = authors ? (authors as string).split(',') : [];

    const comics = await ComicModel.getAll({
      authors: authorsList,
      genres: genresList,
      title: title as string,
      page: +page,
      limit: +limit,
      order: order as string,
      sort: sort as string,
    });

    const comicsWithAvgRating = await Promise.all(
      comics.map(async (comic) => {
        const avgRating = await ComicModel.getAvgRating(comic.id);
        return {
          ...comic,
          avgRating,
        };
      })
    );

    const totalComics = await ComicModel.getAllCount({
      genres: genresList,
      authors: authorsList,
      title: title as string,
    });

    return CustomResponse.ok(res, {
      comics: comicsWithAvgRating,
      currentPage: +page,
      totalPages: Math.ceil(totalComics / +limit),
    });
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error while fetching comics on server side',
      error,
    });
  }
};

export const getComic = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const existedComic = await ComicModel.get(id);

    if (!existedComic) {
      return CustomResponse.notFound(res, {
        message: `сomic with id = ${id} does not exist`,
      });
    }

    const avgRating = await ComicModel.getAvgRating(existedComic.id);

    return CustomResponse.ok(res, {
      ...existedComic,
      avgRating,
    });
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error when fetching comic with id = ${id}`,
      error,
    });
  }
};
