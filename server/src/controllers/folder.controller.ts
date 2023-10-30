import { Request, Response } from 'express';

import { LIMITS } from '@/configs/general.configs';
import { ComicModel } from '@/models/comic.model';
import { FolderModel } from '@/models/folder.model';
import { UserModel } from '@/models/user.model';
import { IFoldersWithIsExistComic } from '@/types/folder.types';
import { CustomResponse } from '@/utils/helpers/custom-response';
import { serverErrorResponse } from '@/utils/helpers/serverErrorResponse';

export const createFolder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const totalFolders = await FolderModel.getTotalUserFolders(req.user.id);

    if (totalFolders >= LIMITS.maxFoldersPerUser) {
      return CustomResponse.forbidden(res, {
        message: `You have already reached the limit of ${LIMITS.maxFoldersPerUser} folders`,
      });
    }

    const folder = await FolderModel.create({
      userId: req.user.id,
      order: totalFolders + 1,
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
  const { folderId } = req.params;

  try {
    const folder = await FolderModel.getById(folderId);

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

export const getUserFoldersWithComicInfo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const folders = await FolderModel.getAllWithComics(req.user.id);

    return CustomResponse.ok(res, folders);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error while getting folders for user`,
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
    const existedComic = await ComicModel.get(comicId);

    if (!existedFolder) {
      return CustomResponse.notFound(res, {
        message: 'folder does not exist',
      });
    }
    if (!existedComic) {
      return CustomResponse.notFound(res, {
        message: 'comic does not exist',
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

export const reorderFolders = async (req: Request, res: Response): Promise<Response> => {
  const { folders } = req.body as {
    folders: string[];
  };

  try {
    const existedFolders = await FolderModel.getAllByIds(folders);

    if (existedFolders.length !== folders.length) {
      return CustomResponse.notFound(res, {
        message: 'there are non-existent folders in the passed list',
      });
    }
    if (!existedFolders.some((folder) => folder.id !== req.user.id)) {
      return CustomResponse.forbidden(res, {
        message: 'you are trying to change a folder/folders that you do not own',
      });
    }

    await Promise.all(
      folders.map((folderId, i) =>
        FolderModel.updateOrder({
          id: folderId,
          order: i + 1,
        })
      )
    );
    return CustomResponse.ok(res, null);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error when updating folder order`,
      error,
    });
  }
};

export const updateFolder = async (req: Request, res: Response): Promise<Response> => {
  const { folderId } = req.params;
  const { comics } = req.body;

  try {
    const existedFolder = await FolderModel.getById(folderId);

    if (!existedFolder) {
      return CustomResponse.notFound(res, {
        message: 'folder does not exist',
      });
    }
    if (existedFolder.userId !== req.user.id) {
      return CustomResponse.forbidden(res, {
        message: 'you are not the owner of this folder to change it',
      });
    }

    const existedComics = await ComicModel.getAllByIds(comics);

    if (existedComics.length !== comics.length) {
      const diff = comics.length - existedComics.length;
      return CustomResponse.conflict(res, {
        message: `there are ${diff} non-existent comics in the submitted list of comics`,
      });
    }

    const updatedFolder = await FolderModel.update({
      id: existedFolder.id,
      comics,
      ...req.body,
    });

    return CustomResponse.ok(res, updatedFolder);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error when updating folder with id = ${folderId}`,
      error,
    });
  }
};

export const deleteFolder = async (req: Request, res: Response): Promise<Response> => {
  const { folderId } = req.params;

  try {
    const existedFolder = await FolderModel.getById(folderId);
    if (!existedFolder) {
      return CustomResponse.notFound(res, {
        message: `Folder with id = ${folderId} does not exist`,
      });
    }
    if (existedFolder.userId !== req.user.id) {
      return CustomResponse.forbidden(res, {
        message: 'You are not the owner of this folder',
      });
    }

    const deletedFolder = await FolderModel.deleteById(existedFolder.id);

    const allFolders = await FolderModel.getAll(req.user.id);

    await Promise.all(
      allFolders.map(({ id }, i) =>
        FolderModel.updateOrder({
          id,
          order: i + 1,
        })
      )
    );

    return CustomResponse.ok(res, deletedFolder);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `An error occurred on the server while trying to delete a folder with id = ${folderId}`,
      error,
    });
  }
};
