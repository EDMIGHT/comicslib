import { Request, Response } from 'express';

import { ComicModel } from '@/models/comic.model';
import { CommentModel } from '@/models/comment.model';
import { IPaginationArg, ISortArg } from '@/types/common.types';
import { createResponseUser } from '@/utils/helpers/createResponseUser';
import { CustomResponse } from '@/utils/helpers/customResponse';
import { serverErrorResponse } from '@/utils/helpers/serverErrorResponse';

export const createComment = async (req: Request, res: Response): Promise<Response> => {
  const { comicId } = req.params;

  try {
    const existedComic = await ComicModel.get(comicId);

    if (!existedComic) {
      return CustomResponse.notFound(res, {
        message: 'the comic for which the comment is being created does not exist',
      });
    }

    const comment = await CommentModel.createForComic({
      comicId,
      userId: req.user.id,
      text: req.body.text,
    });

    return CustomResponse.created(res, {
      ...comment,
      user: createResponseUser(comment.user),
    });
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error when creating a comic on the server side',
      error,
    });
  }
};

export const getComments = async (req: Request, res: Response): Promise<Response> => {
  const { comicId } = req.params;
  const {
    page = 1,
    limit = 10,
    order = 'desc',
    sort = 'createdAt',
  } = req.query as unknown as IPaginationArg & ISortArg;

  try {
    const existedComic = await ComicModel.get(comicId);

    if (!existedComic) {
      return CustomResponse.notFound(res, {
        message: 'the comic for which comments are requested does not exist',
      });
    }

    const comments = await CommentModel.getAllForComic({
      comicId,
      page,
      limit,
      sort,
      order,
    });

    const totalCommentsByComic = await CommentModel.getTotal(comicId);

    const responseComments = comments.map((comm) => ({
      ...comm,
      user: createResponseUser(comm.user),
    }));

    return CustomResponse.ok(res, {
      comments: responseComments,
      currentPage: page,
      totalPages: Math.ceil(totalCommentsByComic / limit),
    });
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error while fetching comics on server side',
      error,
    });
  }
};
