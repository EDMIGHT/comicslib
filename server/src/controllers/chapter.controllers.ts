import { Request, Response } from 'express';

import { ChapterModel } from '@/models/chapter.model';
import { ComicModel } from '@/models/comic.model';
import { PageModel } from '@/models/page.model';
import { IRequestChapter } from '@/types/chapter.types';
import { ISortOrder } from '@/types/common.types';
import cloudinary from '@/utils/cloudinary';
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
  const { pages, ...chapterData } = req.body as IRequestChapter;
  try {
    const chapter = await ChapterModel.create({ ...chapterData, userId: req.user.id });

    await Promise.all(
      pages.map(async ({ img, number }) => {
        const uploadedImg = await cloudinary.uploader.upload(img, {
          folder: 'pages',
        });
        return await PageModel.create({
          number,
          img: uploadedImg.secure_url,
          chapterId: chapter.id,
        });
      })
    );
    await ComicModel.refreshUpdatedAt(chapter.comicId);
    return CustomResponse.created(res, chapter);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error while creating genre on server side',
      error,
    });
  }
};

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
