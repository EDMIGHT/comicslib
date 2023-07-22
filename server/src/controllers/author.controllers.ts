import { Request, Response } from 'express';

import { AuthorModel } from '@/models/author.model';
import { CustomResponse } from '@/utils/helpers/customResponse';
import { serverErrorResponse } from '@/utils/helpers/serverErrorResponse';

export const createAuthor = async (req: Request, res: Response): Promise<Response> => {
  try {
    const genre = await AuthorModel.create({ ...req.body });

    return CustomResponse.created(res, genre);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error while creating author on server side',
      error,
    });
  }
};
