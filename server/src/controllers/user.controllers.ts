import { Request, Response } from 'express';

import { BookmarksModel } from '@/models/bookmarks.model';
import { ChapterModel } from '@/models/chapter.model';
import { ComicModel } from '@/models/comic.model';
import { FolderModel } from '@/models/folder.model';
import { PageModel } from '@/models/page.model';
import { UserModel } from '@/models/user.model';
import { ISortOrder } from '@/types/common.types';
import { IFoldersWithIsExistComic } from '@/types/folder.types';
import cloudinary from '@/utils/cloudinary';
import { createResponseUser } from '@/utils/helpers/createResponseUser';
import { CustomResponse } from '@/utils/helpers/customResponse';
import { serverErrorResponse } from '@/utils/helpers/serverErrorResponse';

export const getAllUser = async (req: Request, res: Response): Promise<Response> => {
  const { login, page = 1, limit = 5, sort = 'createdAt', order = 'asc' } = req.query;

  try {
    const users = await UserModel.getAll({
      login: login as string,
      page: Number(page),
      limit: Number(limit),
      sort: sort as string,
      order: order as ISortOrder,
    });
    const totalUsers = await UserModel.getAllCount(login as string);

    return CustomResponse.ok(res, {
      users: users.map((user) => createResponseUser(user)),
      currentPage: Number(page),
      totalPages: Math.ceil(totalUsers / +limit),
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
  const { title = '', page = 1, limit = 5, sort = 'updatedAt', order = 'desc' } = req.query;
  const { login } = req.params;

  try {
    const existedUser = await UserModel.getByLogin(login);

    if (!existedUser) {
      return CustomResponse.notFound(res, {
        message: 'The user for which the downloaded comics are requested does not exist',
      });
    }

    const uploadedComics = await ComicModel.getAllUploadedByUser({
      login: login,
      title: title as string,
      page: Number(page),
      limit: Number(limit),
      sort: sort as string,
      order: order as ISortOrder,
    });
    const countUploadedComics = await ComicModel.getAllCountUploadedByUser(login);

    return CustomResponse.ok(res, {
      comics: uploadedComics,
      currentPage: Number(page),
      totalPages: Math.ceil(countUploadedComics / Number(limit)),
    });
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error while fetching uploaded comic chapters`,
      error,
    });
  }
};

export const createFolder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const folder = await FolderModel.create({
      userId: req.user.id,
      ...req.body,
    });

    return CustomResponse.created(res, folder);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error while creating folder`,
      error,
    });
  }
};

export const getFolder = async (req: Request, res: Response): Promise<Response> => {
  const { login, folderId } = req.params;

  try {
    const folder = await FolderModel.getByFolderIdAndLogin({
      id: folderId,
      login,
    });

    return CustomResponse.ok(res, folder);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error while getting folder contents`,
      error,
    });
  }
};

export const getUserFolders = async (req: Request, res: Response): Promise<Response> => {
  const { login } = req.params;

  try {
    const existedUser = await UserModel.getByLogin(login);
    if (!existedUser) {
      return CustomResponse.notFound(res, {
        message: 'the user for whom the folders were requested does not exist',
      });
    }

    const folders = await FolderModel.getAll(existedUser.id);

    return CustomResponse.ok(res, folders);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `error on server side when getting folders of user with login ${login}`,
      error,
    });
  }
};

export const getUserFoldersByComic = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { comicId } = req.params;
  try {
    const folders = await FolderModel.getByLogin(req.user.login, comicId);

    const foldersWithIsExistComic = folders.map((folder: IFoldersWithIsExistComic) => {
      folder.isComicExist = folder.comics.some((comic) => comic.id === comicId);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { comics, ...res } = folder;
      return res;
    });

    return CustomResponse.ok(res, foldersWithIsExistComic);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error while getting your folders for comic with id ${comicId}`,
      error,
    });
  }
};

export const updateComicsFolder = async (req: Request, res: Response): Promise<Response> => {
  const { folderId, comicId } = req.params;

  try {
    const existedFolder = await FolderModel.getWithComicsIds(folderId);

    if (!existedFolder) {
      return CustomResponse.notFound(res, {
        message: 'folder does not exist',
      });
    }
    if (existedFolder.userId !== req.user.id) {
      return CustomResponse.conflict(res, {
        message: 'you are not the owner of this folder to change it',
      });
    }

    let newFolderComics;

    if (existedFolder.comics.some((com) => com.id === comicId)) {
      newFolderComics = existedFolder.comics.filter((comic) => comic.id !== comicId);
    } else {
      newFolderComics = [...existedFolder.comics, { id: comicId }];
    }

    const updatedFolder = await FolderModel.updateComics({
      id: folderId,
      prevComics: existedFolder.comics,
      newComics: newFolderComics,
    });

    return CustomResponse.ok(res, updatedFolder);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error changing folder`,
      error,
    });
  }
};

export const getBookmarks = async (req: Request, res: Response): Promise<Response> => {
  const { login } = req.params;
  const { title, page = 1, limit = 5, sort = 'updatedAt', order = 'desc' } = req.query;

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

export const updateBookmark = async (req: Request, res: Response): Promise<Response> => {
  const { comicId, chapterId, pageNumber } = req.body;
  try {
    const existedComic = await ComicModel.get(comicId);
    if (!existedComic) {
      return CustomResponse.notFound(res, {
        message: 'the comic for bookmark is being updated was not found',
      });
    }

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

export const getAllSubscribedComics = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { title, page = 1, limit = 10, order = 'desc', sort = 'createdAt' } = req.query;

  try {
    const ComicsSubscribed = await ComicModel.getAllSubscribedComics({
      userId: req.user.id,
      page: Number(page),
      limit: Number(limit),
      sort: sort as string,
      order: order as ISortOrder,
      title: title as string,
    });
    const totalSubscribedComics = await ComicModel.getAllCountSubscribedComic({
      userId: req.user.id,
      title: title as string,
    });

    return CustomResponse.ok(res, {
      comics: ComicsSubscribed,
      currentPage: Number(page),
      totalPages: Math.ceil(totalSubscribedComics / Number(limit)),
    });
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error when fetching comics you follow`,
      error,
    });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const { img, ...restPaylaod } = req.body;

  try {
    let uploadedImg;

    if (img) {
      uploadedImg = await cloudinary.uploader.upload(img, {
        folder: 'users',
      });
    }

    const updatedUser = await UserModel.update({
      id: req.user.id,
      ...restPaylaod,
      img: uploadedImg?.secure_url,
    });

    return CustomResponse.ok(res, updatedUser);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error when updating user data`,
      error,
    });
  }
};
