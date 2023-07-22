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
      page: +page,
      limit: +limit,
      order: order as string,
      sort: sort as string,
    });

    const totalComics = await ComicModel.getAllCount({
      genres: genresList,
      authors: authorsList,
    });

    return CustomResponse.ok(res, {
      comics,
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
