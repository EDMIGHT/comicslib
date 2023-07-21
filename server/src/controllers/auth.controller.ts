import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import { UserModel } from '@/models/user.model';
import tokenService from '@/services/token.service';
import createResponseUser from '@/utils/helpers/createResponseUser';
import { CustomResponse } from '@/utils/helpers/customResponse';

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

    const responseUser = createResponseUser(user);

    return CustomResponse.created(res, {
      user: responseUser,
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

    const responseUser = createResponseUser(existedUser);

    return CustomResponse.created(res, {
      ...tokens,
      user: responseUser,
    });
  } catch (error) {
    console.error(error);
    return CustomResponse.serverError(res, {
      message: 'server side authorization error',
    });
  }
};
