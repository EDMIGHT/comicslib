import { Request, Response } from 'express';

import { ChapterModel } from '@/models/chapter.model';
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

    const nextChapter = await ChapterModel.getNextChapter(page.chapter.number);
    const prevChapter = await ChapterModel.getPrevChapter(page.chapter.number);

    return CustomResponse.ok(res, {
      chapter: page.chapter,
      img: page.img,
      nextChapter,
      prevChapter,
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
    const existedPage = await PageModel.get(req.body);

    if (existedPage) {
      return CustomResponse.conflict(res, {
        message: 'such page with such number already exists in this part',
      });
    }

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
