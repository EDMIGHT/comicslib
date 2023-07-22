import { Request, Response } from 'express';

import { GenreModel } from '@/models/genre.model';
import { CustomResponse } from '@/utils/helpers/customResponse';
import { serverErrorResponse } from '@/utils/helpers/serverErrorResponse';

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
