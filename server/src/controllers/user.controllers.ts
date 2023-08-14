import { Request, Response } from 'express';

import { ChapterModel } from '@/models/chapter.model';
import { ComicModel } from '@/models/comic.model';
import { FolderModel } from '@/models/folder.model';
import { PageModel } from '@/models/page.model';
import { ReadingHistoryModel } from '@/models/reading-history.model';
import { UserModel } from '@/models/user.model';
import { IFoldersWithIsExistComic } from '@/types/folder.types';
import { createResponseUser } from '@/utils/helpers/createResponseUser';
import { CustomResponse } from '@/utils/helpers/customResponse';
import { serverErrorResponse } from '@/utils/helpers/serverErrorResponse';

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

// TODO оптимизировать

export const getUserFolders = async (req: Request, res: Response): Promise<Response> => {
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
      message: `server side error while getting folder contents`,
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

export const updateReadingHistory = async (req: Request, res: Response): Promise<Response> => {
  const { comicId, chapterId, pageNumber } = req.body;
  try {
    const existedComic = await ComicModel.get(comicId);
    if (!existedComic) {
      return CustomResponse.notFound(res, {
        message: 'the comic for which the story is being updated was not found',
      });
    }

    const existedChapter = await ChapterModel.get(chapterId);
    if (!existedChapter) {
      return CustomResponse.notFound(res, {
        message: 'the chapter of the comic for which the story is being updated was not found',
      });
    }

    const existedPage = await PageModel.get({
      chapterId: existedChapter.id,
      number: Number(pageNumber),
    });
    if (!existedPage) {
      return CustomResponse.notFound(res, {
        message: 'the chapter page for history update was not found',
      });
    }

    const updatedReadingHistory = await ReadingHistoryModel.create({
      chapterId,
      comicId,
      pageId: Number(pageNumber),
      userId: req.user.id,
    });

    return CustomResponse.ok(res, updatedReadingHistory);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `an error occurred on the server side while updating the read history`,
      error,
    });
  }
};
