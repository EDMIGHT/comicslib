import { Request, Response } from 'express';

import { ROOT_FOLDER_CLOUDINARY } from '@/configs/general.configs';
import { ComicModel } from '@/models/comic.model';
import { RatingModel } from '@/models/rating.model';
import { IGetAllComicsQuery } from '@/types/comic.types';
import { IPaginationArg, ISortArg } from '@/types/common.types';
import cloudinary from '@/utils/cloudinary';
import { CustomResponse } from '@/utils/helpers/custom-response';
import { serverErrorResponse } from '@/utils/helpers/serverErrorResponse';

export const createComic = async (req: Request, res: Response): Promise<Response> => {
  const { img, releasedAt, ...rest } = req.body as {
    releasedAt: Date;
    title: string;
    authors: string[];
    genres: string[];
    themes: string[];
    statusId: string;
    img: string;
    desc: string | null;
  };

  try {
    const uploadedImg = await cloudinary.uploader.upload(img, {
      folder: `${ROOT_FOLDER_CLOUDINARY}/comics`,
    });
    const formattedReleasedAt = new Date(releasedAt);
    console.log(formattedReleasedAt);

    const comic = await ComicModel.create({
      ...rest,
      releasedAt: formattedReleasedAt,
      img: uploadedImg.secure_url,
    });

    return CustomResponse.created(res, comic);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error when creating a comic on the server side',
      error,
    });
  }
};

export const getComics = async (req: Request, res: Response): Promise<Response> => {
  const {
    genres,
    themes,
    authors,
    statuses,
    title = '',
    folderId,
    ratedUser,
    date,
    startDate,
    endDate,
    page = 1,
    limit = 5,
    order = 'desc',
    sort = 'createdAt',
  } = req.query as unknown as IGetAllComicsQuery;

  try {
    const genresList = genres ? (genres as string).split(',') : [];
    const themesList = themes ? (themes as string).split(',') : [];
    const authorsList = authors ? (authors as string).split(',') : [];
    const statusesList = statuses ? (statuses as string).split(',') : [];

    const comics = await ComicModel.getAll({
      authors: authorsList,
      themes: themesList,
      genres: genresList,
      statuses: statusesList,
      title,
      page,
      limit,
      order,
      sort,
      folderId,
      ratedUser,
      date,
      startDate,
      endDate,
    });

    const totalComics = await ComicModel.getAllCount({
      genres: genresList,
      themes: themesList,
      authors: authorsList,
      statuses: statusesList,
      title: title as string,
      folderId: folderId as string,
      ratedUser: ratedUser as string,
      date: date as string,
      startDate: startDate as string,
      endDate: endDate as string,
    });

    return CustomResponse.ok(res, {
      comics,
      currentPage: +page,
      totalPages: Math.ceil(totalComics / +limit),
    });
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error while fetching comics on server side',
      error,
    });
  }
};

export const getComic = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const existedComic = await ComicModel.get(id);

    if (!existedComic) {
      return CustomResponse.notFound(res, {
        message: `comic with id = ${id} does not exist`,
      });
    }

    return CustomResponse.ok(res, existedComic);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error when fetching comic with id = ${id}`,
      error,
    });
  }
};

export const getRatings = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const existedComic = await ComicModel.get(id);

    if (!existedComic) {
      return CustomResponse.notFound(res, {
        message: 'the comic for which ratings were requested does not exist.',
      });
    }

    const ratings = await RatingModel.getAll(id);

    return CustomResponse.ok(res, ratings);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error when trying to get all ratings for a comic`,
      error,
    });
  }
};

export const getUserRating = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const existedComic = await ComicModel.get(id);

    if (!existedComic) {
      return CustomResponse.notFound(res, {
        message: 'the comic for which the user rating was requested does not exist',
      });
    }

    const rating = await RatingModel.getByUserId(id, req.user.id);

    return CustomResponse.ok(res, rating);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error when trying to get all ratings for a comic`,
      error,
    });
  }
};

export const getRandom = async (_: Request, res: Response): Promise<Response> => {
  try {
    const totalComic = await ComicModel.getAllCount({});
    const skip = Math.floor(Math.random() * totalComic);
    const randomComic = await ComicModel.getComicBySkip(skip);

    if (!randomComic) {
      return CustomResponse.notFound(res, {
        message: 'there is not a single comic in the database to get a random one',
      });
    }

    return CustomResponse.ok(res, {
      randomId: randomComic.id,
    });
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error when getting random comic id`,
      error,
    });
  }
};

export const getComicsWithChapters = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {
    title = '',
    page = 1,
    limit = 5,
    sort = 'updatedAt',
    order = 'desc',
  } = req.query as unknown as IPaginationArg &
    ISortArg & {
      title: string;
    };

  try {
    const uploadedComics = await ComicModel.getAllWithChapters({
      title,
      page,
      limit,
      sort,
      order,
    });
    const countUploadedComics = await ComicModel.getAllCountWithChapters({ title });

    return CustomResponse.ok(res, {
      comics: uploadedComics,
      currentPage: page,
      totalPages: Math.ceil(countUploadedComics / limit),
    });
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error when receiving comics with parts`,
      error,
    });
  }
};

export const updateComicRating = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const existedComic = await ComicModel.get(id);

    if (!existedComic) {
      return CustomResponse.notFound(res, {
        message: 'the comic for which the rating is being created does not exist',
      });
    }

    const existedReview = await RatingModel.getByUserId(id, req.user.id);

    let updatedReview;

    if (existedReview) {
      if (existedReview.value === req.body.value) {
        await RatingModel.delete(existedReview.id);
        updatedReview = null;
      } else {
        updatedReview = await RatingModel.update({
          id: existedReview.id,
          value: req.body.value,
        });
      }
    } else {
      updatedReview = await RatingModel.create({
        comicId: id,
        userId: req.user.id,
        value: req.body.value,
      });
    }

    return CustomResponse.ok(res, updatedReview);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error when trying to rate a comic`,
      error,
    });
  }
};
