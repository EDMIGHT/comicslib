import { Request, Response } from 'express';

import { ChapterModel } from '@/models/chapter.model';
import { ISortOrder } from '@/types/common.types';
import { CustomResponse } from '@/utils/helpers/customResponse';
import { serverErrorResponse } from '@/utils/helpers/serverErrorResponse';

export const getChaptersByComicId = async (req: Request, res: Response): Promise<Response> => {
  const { comicId } = req.params;
  const { page = 1, limit = 10, order = 'desc', sort = 'number' } = req.query;
  try {
    const chapters = await ChapterModel.getAll({
      comicId,
      limit: Number(limit),
      order: order as ISortOrder,
      page: Number(page),
      sort: sort as string,
    });
    const totalChapters = await ChapterModel.getTotalChapters(comicId);

    return CustomResponse.ok(res, {
      chapters,
      currentPage: Number(page),
      totalPages: Math.ceil(totalChapters / +limit),
    });
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error while receiving genres on server side',
      error,
    });
  }
};

export const createChapter = async (req: Request, res: Response): Promise<Response> => {
  try {
    const chapter = await ChapterModel.create({ ...req.body, userId: req.user.id });

    return CustomResponse.created(res, chapter);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error while creating genre on server side',
      error,
    });
  }
};
