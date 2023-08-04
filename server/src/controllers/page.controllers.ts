import { Request, Response } from 'express';

import { PageModel } from '@/models/page.model';
import { CustomResponse } from '@/utils/helpers/customResponse';
import { serverErrorResponse } from '@/utils/helpers/serverErrorResponse';

export const getPageByChapterId = async (req: Request, res: Response): Promise<Response> => {
  const { chapterId, pageNumber } = req.params;

  try {
    const page = await PageModel.get({
      chapterId,
      number: Number(pageNumber),
    });

    if (!page) {
      return CustomResponse.notFound(res, {
        message: 'there are no pages with this number.',
      });
    }

    const totalPagesInChapter = await PageModel.getTotal(chapterId);

    return CustomResponse.ok(res, {
      img: page.img,
      currentPage: page.number,
      totalPages: totalPagesInChapter,
    });
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error while receiving genres on server side',
      error,
    });
  }
};

export const createPage = async (req: Request, res: Response): Promise<Response> => {
  try {
    const page = await PageModel.create(req.body);

    return CustomResponse.created(res, page);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error while creating genre on server side',
      error,
    });
  }
};
