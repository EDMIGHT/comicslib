import { Request, Response } from 'express';

import { ComicModel } from '@/models/comic.model';
import { CommentModel } from '@/models/comment.model';
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
      message: 'error while fetching comics on server side',
      error,
    });
  }
};
