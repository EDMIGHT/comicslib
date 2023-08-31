import { Request, Response } from 'express';

import { ComicModel } from '@/models/comic.model';
import { RatingModel } from '@/models/rating.model';
import { ISortOrder } from '@/types/common.types';
import cloudinary from '@/utils/cloudinary';
import { CustomResponse } from '@/utils/helpers/customResponse';
import { serverErrorResponse } from '@/utils/helpers/serverErrorResponse';

export const createComic = async (req: Request, res: Response): Promise<Response> => {
  const { img, ...rest } = req.body;

  try {
    const uploadedImg = await cloudinary.uploader.upload(img, {
      folder: 'comics',
    });

    const comic = await ComicModel.create({ ...rest, img: uploadedImg.secure_url });

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
  try {
    const {
      genres,
      themes,
      authors,
      statuses,
      title,
      folderId,
      ratedUser,
      date,
      startDate,
      endDate,
      page = 1,
      limit = 10,
      order = 'desc',
      sort = 'createdAt',
    } = req.query;

    const genresList = genres ? (genres as string).split(',') : [];
    const themesList = themes ? (themes as string).split(',') : [];
    const authorsList = authors ? (authors as string).split(',') : [];
    const statusesList = statuses ? (statuses as string).split(',') : [];

    const comics = await ComicModel.getAll({
      authors: authorsList,
      themes: themesList,
      genres: genresList,
      statuses: statusesList,
      title: title as string,
      page: +page,
      limit: +limit,
      order: order as ISortOrder,
      sort: sort as string,
      folderId: folderId as string,
      ratedUser: ratedUser as string,
      date: date as string,
      startDate: startDate as string,
      endDate: endDate as string,
    });

    const comicsWithAvgRating = await Promise.all(
      comics.map(async (comic) => {
        const avgRating = await ComicModel.getAvgRating(comic.id);
        return {
          ...comic,
          avgRating,
        };
      })
    );
    const comicsWithAvgRatingAndCountUniqueSubscribes = await Promise.all(
      comicsWithAvgRating.map(async (comic) => {
        const countUniqueSubscribes = await ComicModel.getUniqueSubscribes(comic.id);
        return {
          ...comic,
          countUniqueSubscribes,
        };
      })
    );

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
      comics: comicsWithAvgRatingAndCountUniqueSubscribes,
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

    const avgRating = await ComicModel.getAvgRating(existedComic.id);
    const countUniqueSubscribes = await ComicModel.getUniqueSubscribes(existedComic.id);

    return CustomResponse.ok(res, {
      ...existedComic,
      avgRating: avgRating?.toFixed(1),
      countUniqueSubscribes,
    });
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

export const getRandom = async (req: Request, res: Response): Promise<Response> => {
  try {
    const totalComic = await ComicModel.getAllCount({});
    const skip = Math.floor(Math.random() * totalComic);
    const randomComic = await ComicModel.getComicBySkip(skip);

    return CustomResponse.ok(res, {
      randomId: randomComic?.id,
    });
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error when getting random comic id`,
      error,
    });
  }
};
