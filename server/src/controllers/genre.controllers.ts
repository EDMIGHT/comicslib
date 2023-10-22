import { Request, Response } from 'express';

import { GenreModel } from '@/models/genre.model';
import { CustomResponse } from '@/utils/helpers/custom-response';
import { serverErrorResponse } from '@/utils/helpers/serverErrorResponse';

export const getAllGenres = async (_: Request, res: Response): Promise<Response> => {
  try {
    const genres = await GenreModel.getAll();

    return CustomResponse.ok(res, genres);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error while receiving genres on server side',
      error,
    });
  }
};

export const getGenre = async (req: Request, res: Response): Promise<Response> => {
  const { title } = req.params;

  try {
    const genre = await GenreModel.getByTitle(title);

    return CustomResponse.ok(res, genre);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error while receiving genre on server side',
      error,
    });
  }
};

export const createGenre = async (req: Request, res: Response): Promise<Response> => {
  try {
    const genre = await GenreModel.create({ ...req.body });

    return CustomResponse.created(res, genre);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error while creating genre on server side',
      error,
    });
  }
};
