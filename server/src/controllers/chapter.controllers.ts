import { Request, Response } from 'express';

import { ROOT_FOLDER_CLOUDINARY } from '@/configs/general.configs';
import { ChapterModel } from '@/models/chapter.model';
import { ComicModel } from '@/models/comic.model';
import { PageModel } from '@/models/page.model';
import { IRequestChapter } from '@/types/chapter.types';
import { IPaginationArg, ISortArg } from '@/types/common.types';
import cloudinary from '@/utils/cloudinary';
import { CustomResponse } from '@/utils/helpers/custom-response';
import { serverErrorResponse } from '@/utils/helpers/serverErrorResponse';

export const getChaptersByComicId = async (req: Request, res: Response): Promise<Response> => {
  const { comicId } = req.params;
  const {
    page = 1,
    limit = 10,
    order = 'desc',
    sort = 'number',
  } = req.query as unknown as IPaginationArg & ISortArg;

  try {
    const chapters = await ChapterModel.getAll({
      comicId,
      limit,
      order,
      page,
      sort,
    });
    const totalChapters = await ChapterModel.getTotalChapters(comicId);

    return CustomResponse.ok(res, {
      chapters,
      currentPage: page,
      totalPages: Math.ceil(totalChapters / limit),
    });
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error while receiving genres on server side',
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

    const nextChapter = await ChapterModel.getNextChapter({
      comicId: page.chapter.comicId,
      number: page.chapter.number,
    });
    const prevChapter = await ChapterModel.getPrevChapter({
      comicId: page.chapter.comicId,
      number: page.chapter.number,
    });

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

export const getContentForComic = async (req: Request, res: Response): Promise<Response> => {
  const { comicId } = req.params;

  try {
    const existedComic = await ComicModel.get(comicId);

    if (!existedComic) {
      return CustomResponse.notFound(res, {
        message: 'the comic for which the content is requested does not exist',
      });
    }

    const content = await ChapterModel.getContentByComicId(comicId);

    return CustomResponse.ok(res, content);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'server side error when retrieving content for a comic',
      error,
    });
  }
};

export const createChapter = async (req: Request, res: Response): Promise<Response> => {
  const { pages, ...chapterData } = req.body as IRequestChapter;
  try {
    const existedChapter = await ChapterModel.getByComicIdAndNumber({
      comicId: chapterData.comicId,
      number: chapterData.number,
    });

    if (existedChapter) {
      return CustomResponse.conflict(res, {
        message: `A chapter with this number already exists for the comic with id = ${chapterData.comicId}`,
      });
    }

    const chapter = await ChapterModel.create({ ...chapterData, userId: req.user.id });

    await Promise.all(
      pages.map(async ({ img, number }) => {
        const uploadedImg = await cloudinary.uploader.upload(img, {
          folder: `${ROOT_FOLDER_CLOUDINARY}/pages`,
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
