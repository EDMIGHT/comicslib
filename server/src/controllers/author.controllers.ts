import { Request, Response } from 'express';

import { AuthorModel } from '@/models/author.model';
import { CustomResponse } from '@/utils/helpers/customResponse';
import { serverErrorResponse } from '@/utils/helpers/serverErrorResponse';

export const getAllAuthors = async (req: Request, res: Response): Promise<Response> => {
  try {
    const authors = await AuthorModel.getAll();

    return CustomResponse.ok(res, {
      authors,
      currentPage: 1,
      totalPages: 1,
    });
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error while receiving genres on server side',
      error,
    });
  }
};

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
