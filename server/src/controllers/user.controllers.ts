import { Request, Response } from 'express';

import { ROOT_FOLDER_CLOUDINARY } from '@/configs/general.configs';
import { BookmarksModel } from '@/models/bookmarks.model';
import { ChapterModel } from '@/models/chapter.model';
import { ComicModel } from '@/models/comic.model';
import { PageModel } from '@/models/page.model';
import { UserModel } from '@/models/user.model';
import { PasswordService } from '@/services/password.service';
import { IPaginationArg, ISortArg, ISortOrder } from '@/types/common.types';
import cloudinary from '@/utils/cloudinary';
import { createResponseUser } from '@/utils/helpers/create-response-user';
import { CustomResponse } from '@/utils/helpers/custom-response';
import { serverErrorResponse } from '@/utils/helpers/serverErrorResponse';

export const getAllUser = async (req: Request, res: Response): Promise<Response> => {
  const {
    login,
    page = 1,
    limit = 5,
    sort = 'createdAt',
    order = 'asc',
  } = req.query as unknown as IPaginationArg &
    ISortArg & {
      login: string;
    };

  try {
    const users = await UserModel.getAll({
      login,
      page,
      limit,
      sort,
      order,
    });
    const totalUsers = await UserModel.getAllCount(login);

    return CustomResponse.ok(res, {
      users: users.map((user) => createResponseUser(user)),
      currentPage: Number(page),
      totalPages: Math.ceil(totalUsers / limit),
    });
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `a server error occurred while getting the user profile`,
      error,
    });
  }
};

export const getProfile = async (req: Request, res: Response): Promise<Response> => {
  const { login } = req.params;

  try {
    const userWithData = await UserModel.getByLoginWithData(login);

    if (!userWithData) {
      return CustomResponse.notFound(res, {
        message: `user with this login does not exist`,
      });
    }

    return CustomResponse.ok(res, createResponseUser(userWithData));
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `a server error occurred while getting the user profile`,
      error,
    });
  }
};

export const getUploads = async (req: Request, res: Response): Promise<Response> => {
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
  const { login } = req.params;

  try {
    const existedUser = await UserModel.getByLogin(login);

    if (!existedUser) {
      return CustomResponse.notFound(res, {
        message: 'The user for which the downloaded comics are requested does not exist',
      });
    }

    const uploadedComics = await ComicModel.getAllWithChapters({
      login,
      title,
      page,
      limit,
      sort,
      order,
      type: 'uploadedBy',
    });
    const countUploadedComics = await ComicModel.getAllCountWithChapters({
      login,
      type: 'uploadedBy',
      title,
    });

    return CustomResponse.ok(res, {
      comics: uploadedComics,
      currentPage: page,
      totalPages: Math.ceil(countUploadedComics / limit),
    });
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error while fetching uploaded comic chapters`,
      error,
    });
  }
};

export const getBookmarks = async (req: Request, res: Response): Promise<Response> => {
  const { login } = req.params;
  const {
    title,
    page = 1,
    limit = 5,
    sort = 'updatedAt',
    order = 'desc',
  } = req.query as unknown as IPaginationArg &
    ISortArg & {
      title: string;
    };

  try {
    const existedUser = await UserModel.getByLogin(login);
    if (!existedUser) {
      return CustomResponse.notFound(res, {
        message: 'user to get bookmarks was not found ',
      });
    }

    const userBookmarks = await BookmarksModel.getAll({
      title: title as string,
      login: existedUser.login,
      page: Number(page),
      limit: Number(limit),
      sort: sort as string,
      order: order as ISortOrder,
    });
    const userTotalCountBookmarks = await BookmarksModel.getAllCount(existedUser.login);

    return CustomResponse.ok(res, {
      bookmarks: userBookmarks,
      currentPage: Number(page),
      totalPages: Math.ceil(userTotalCountBookmarks / Number(limit)),
    });
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error receiving bookmarks`,
      error,
    });
  }
};

export const getUserBookmarkByComic = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { comicId } = req.params;

  try {
    const existedComic = await ComicModel.get(comicId);
    if (!existedComic) {
      return CustomResponse.notFound(res, {
        message: 'the comic for which the user bookmark was requested does not exist',
      });
    }

    const bookmark = await BookmarksModel.getUserBookmark({
      comicId,
      userId: req.user.id,
    });

    return CustomResponse.ok(res, bookmark);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error when getting user's bookmark for a comic`,
      error,
    });
  }
};

export const getAllSubscribedComics = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {
    title,
    page = 1,
    limit = 10,
    order = 'desc',
    sort = 'createdAt',
  } = req.query as unknown as IPaginationArg &
    ISortArg & {
      title: string;
    };

  try {
    const comicsSubscribed = await ComicModel.getAllWithChapters({
      login: req.user.login,
      type: 'subscribedBy',
      page,
      limit,
      sort,
      order,
      title,
    });
    const totalSubscribedComics = await ComicModel.getAllCountWithChapters({
      login: req.user.login,
      type: 'subscribedBy',
      title,
    });

    return CustomResponse.ok(res, {
      comics: comicsSubscribed,
      currentPage: page,
      totalPages: Math.ceil(totalSubscribedComics / limit),
    });
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error when fetching comics you follow`,
      error,
    });
  }
};

export const updateBookmark = async (req: Request, res: Response): Promise<Response> => {
  const { comicId, chapterId, pageNumber } = req.body;
  try {
    const existedChapter = await ChapterModel.get(chapterId);
    if (!existedChapter) {
      return CustomResponse.notFound(res, {
        message: 'the chapter of the comic for bookmark is being updated was not found',
      });
    }

    const existedPage = await PageModel.get({
      chapterId: existedChapter.id,
      number: Number(pageNumber),
    });
    if (!existedPage) {
      return CustomResponse.notFound(res, {
        message: 'the chapter page for bookmark was not found',
      });
    }

    const existedBookmark = await BookmarksModel.getUserBookmark({
      comicId,
      userId: req.user.id,
    });

    if (
      existedBookmark &&
      existedBookmark.chapterId === chapterId &&
      existedBookmark.pageNumber === Number(pageNumber)
    ) {
      if (existedBookmark.userId !== req.user.id) {
        return CustomResponse.conflict(res, {
          message: 'you are not the owner of this bookmark',
        });
      }

      await BookmarksModel.deleteUserBookmark({
        comicId,
        userId: req.user.id,
      });

      return CustomResponse.ok(res, null);
    }

    const updatedBookmark = await BookmarksModel.create({
      chapterId,
      comicId,
      pageNumber: Number(pageNumber),
      userId: req.user.id,
    });
    return CustomResponse.ok(res, updatedBookmark);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `an error occurred on the server side while updating the bookmark`,
      error,
    });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const { img, ...restPayload } = req.body;

  try {
    let uploadedImg;

    if (img) {
      uploadedImg = await cloudinary.uploader.upload(img, {
        folder: `${ROOT_FOLDER_CLOUDINARY}/users`,
      });
    }

    const updatedUser = await UserModel.update({
      id: req.user.id,
      ...restPayload,
      img: uploadedImg?.secure_url,
    });

    return CustomResponse.ok(res, createResponseUser(updatedUser));
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error when updating user data`,
      error,
    });
  }
};

export const changePassword = async (req: Request, res: Response): Promise<Response> => {
  const { oldPassword, newPassword } = req.body;

  try {
    const existedUser = await UserModel.getById(req.user.id);

    if (!existedUser) {
      return CustomResponse.notFound(res, {
        message: `the user for whom the password is being changed does not exist`,
      });
    }
    if (!existedUser.password) {
      return CustomResponse.notFound(res, {
        message: `this account was created using an external service and cannot be changed or set a password.`,
      });
    }

    const isPasswordEqual = await PasswordService.compare(oldPassword, existedUser.password);

    if (!isPasswordEqual) {
      return CustomResponse.conflict(res, {
        message: 'wrong old password',
      });
    }

    const hashedPassword = await PasswordService.hash(newPassword);

    const newUser = await UserModel.update({
      id: req.user.id,
      password: hashedPassword,
    });

    return CustomResponse.ok(res, createResponseUser(newUser));
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error when changing password`,
      error,
    });
  }
};

export const deleteBookmark = async (req: Request, res: Response): Promise<Response> => {
  const { comicId } = req.params;

  try {
    const existedComic = await ComicModel.get(comicId);
    if (!existedComic) {
      return CustomResponse.notFound(res, {
        message: 'the comic for which the bookmark is being deleted does not exist',
      });
    }

    const existedBookmark = await BookmarksModel.getUserBookmark({
      comicId,
      userId: req.user.id,
    });
    if (!existedBookmark) {
      return CustomResponse.notFound(res, {
        message: `bookmarks for comics with id = ${comicId} do not exist`,
      });
    }
    if (existedBookmark.userId !== req.user.id) {
      return CustomResponse.conflict(res, {
        message: 'you cant delete other peoples bookmarks',
      });
    }

    await BookmarksModel.deleteUserBookmark({
      comicId,
      userId: req.user.id,
    });
    return CustomResponse.ok(res, null);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `an error occurred on the server side while deleting a bookmark`,
      error,
    });
  }
};

export const clearAllBookmarks = async (req: Request, res: Response): Promise<Response> => {
  try {
    const deleteResult = await BookmarksModel.deleteAllUserBookmarks(req.user.id);

    return CustomResponse.ok(res, deleteResult);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error when clearing user's bookmarks`,
      error,
    });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const existedUser = await UserModel.getById(req.user.id);
    if (!existedUser) {
      return CustomResponse.notFound(res, {
        message: 'The user has already been deleted or does not exist',
      });
    }

    await UserModel.delete(req.user.id);

    return CustomResponse.ok(res, null);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error when clearing user's bookmarks`,
      error,
    });
  }
};
