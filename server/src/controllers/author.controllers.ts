import { Request, Response } from 'express';

import { AuthorModel } from '@/models/author.model';
import { ISortOrder } from '@/types/common.types';
import { CustomResponse } from '@/utils/helpers/customResponse';
import { serverErrorResponse } from '@/utils/helpers/serverErrorResponse';

export const getAllAuthors = async (req: Request, res: Response): Promise<Response> => {
  const { login, page = 1, limit = 5, order = 'asc' } = req.query;

  try {
    const authors = await AuthorModel.getAll({
      login: login as string,
      page: Number(page),
      limit: Number(limit),
      order: order as ISortOrder,
      sort: 'login',
    });
    const totalAuthors = await AuthorModel.getTotalAll({
      login: login as string,
    });

    return CustomResponse.ok(res, {
      authors,
      currentPage: Number(page),
      totalPages: Math.ceil(totalAuthors / Number(limit)),
    });
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error while receiving authors on server side',
      error,
    });
  }
};

export const getAuthor = async (req: Request, res: Response): Promise<Response> => {
  const { title } = req.params;

  try {
    const author = await AuthorModel.getByLogin(title);

    return CustomResponse.ok(res, author);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error while receiving author on server side',
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
