import { Request, Response } from 'express';

import { FolderModel } from '@/models/folder.model';
import { UserModel } from '@/models/user.model';
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
