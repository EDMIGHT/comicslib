import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import { FolderModel } from '@/models/folder.model';
import { UserModel } from '@/models/user.model';
import tokenService from '@/services/token.service';
import { createResponseUser } from '@/utils/helpers/createResponseUser';
import { CustomResponse } from '@/utils/helpers/customResponse';
import { isTokenInvalid } from '@/utils/helpers/isTokenInvalid';

export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { login, password } = req.body;
    const existedUser = await UserModel.getByLogin(login);

    if (existedUser) {
      return CustomResponse.conflict(res, {
        message: `user with login = ${login} already exists`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      ...req.body,
      password: hashedPassword,
    });

    const tokens = tokenService.createTokens({
      id: user.id,
      login: user.login,
    });

    tokenService.save({
      userId: user.id,
      refreshToken: tokens.refreshToken,
    });

    const defaultFolders = [
      FolderModel.create({
        userId: user.id,
        title: 'Reading',
        order: 1,
      }),
      FolderModel.create({
        userId: user.id,
        title: 'Plan to read',
        order: 2,
      }),
      FolderModel.create({
        userId: user.id,
        title: 'Completed',
        order: 3,
      }),
      FolderModel.create({
        userId: user.id,
        title: 'Dropped',
        order: 4,
      }),
    ];

    await Promise.all(defaultFolders);

    return CustomResponse.created(res, {
      user: createResponseUser(user),
      ...tokens,
    });
  } catch (error) {
    console.error(error);
    return CustomResponse.serverError(res, {
      message: 'an error occurred during registration on the server side',
    });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { login, password } = req.body;

    const existedUser = await UserModel.getByLogin(login);

    if (!existedUser) {
      return CustomResponse.notFound(res, {
        message: `User with login = ${login} does not exist`,
      });
    }

    const isPasswordEqual = await bcrypt.compare(password, existedUser.password);

    if (!isPasswordEqual) {
      return CustomResponse.conflict(res, {
        message: 'wrong password',
      });
    }

    const tokens = await tokenService.createTokens({
      id: existedUser.id,
      login: existedUser.login,
    });
    await tokenService.save({
      userId: existedUser.id,
      refreshToken: tokens.refreshToken,
    });

    return CustomResponse.created(res, {
      ...tokens,
      user: createResponseUser(existedUser),
    });
  } catch (error) {
    console.error(error);
    return CustomResponse.serverError(res, {
      message: 'server side authorization error',
    });
  }
};

export const authMe = async (req: Request, res: Response): Promise<Response> => {
  try {
    const existedUser = await UserModel.getById(req.user.id);

    return CustomResponse.ok(res, createResponseUser(existedUser));
  } catch (error) {
    console.log(error);
    return CustomResponse.serverError(res, {
      id: req.user.id,
      message: 'an error occurred on the server side while getting user information',
    });
  }
};

export const updateTokens = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { refreshToken } = request.body;

    const tokenPayload = await tokenService.verifyRefreshToken(refreshToken);
    const dbToken = await tokenService.findRefreshToken(refreshToken);

    if (!dbToken || !tokenPayload || isTokenInvalid(dbToken, tokenPayload)) {
      return CustomResponse.unauthorized(response, {
        message: 'unauthorized access',
      });
    }

    const tokens = tokenService.createTokens({
      id: tokenPayload.id,
      login: tokenPayload.login,
    });
    await tokenService.save({
      userId: tokenPayload.id,
      refreshToken: tokens.refreshToken,
    });

    return CustomResponse.ok(response, {
      ...tokens,
    });
  } catch (error) {
    console.error('update token: ', error);
    return CustomResponse.serverError(response, {
      message: `an error occurred on the server while updating tokens: ${error}`,
    });
  }
};
