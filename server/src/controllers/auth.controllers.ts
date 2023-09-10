import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

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

    const { accessToken, refreshToken, expiresIn, exp } = tokenService.createTokens({
      id: user.id,
      login: user.login,
    });
    tokenService.save({
      userId: user.id,
      refreshToken: refreshToken,
    });

    res.cookie('accessToken', accessToken, {
      maxAge: expiresIn * 1000,
      httpOnly: true,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });
    res.cookie('exp', exp);

    return CustomResponse.created(res, null);
  } catch (error) {
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

    const { accessToken, refreshToken, expiresIn, exp } = await tokenService.createTokens({
      id: existedUser.id,
      login: existedUser.login,
    });
    await tokenService.save({
      userId: existedUser.id,
      refreshToken: refreshToken,
    });

    res.cookie('accessToken', accessToken, {
      maxAge: expiresIn * 1000,
      httpOnly: true,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });
    res.cookie('exp', exp);

    return CustomResponse.created(res, null);
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

export const updateTokens = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { refreshToken: reqRefreshToken } = req.cookies;

    const tokenPayload = await tokenService.verifyRefreshToken(reqRefreshToken);
    const dbToken = await tokenService.findRefreshToken(reqRefreshToken);

    if (!dbToken || !tokenPayload || isTokenInvalid(dbToken, tokenPayload)) {
      return CustomResponse.unauthorized(res, {
        message: 'unauthorized access',
      });
    }

    const { accessToken, refreshToken, exp, expiresIn } = tokenService.createTokens({
      id: tokenPayload.id,
      login: tokenPayload.login,
    });
    await tokenService.save({
      userId: tokenPayload.id,
      refreshToken,
    });

    res.cookie('accessToken', accessToken, {
      maxAge: expiresIn * 1000,
      httpOnly: true,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });
    res.cookie('exp', exp);

    return CustomResponse.ok(res, null);
  } catch (error) {
    console.error('update token: ', error);
    return CustomResponse.serverError(res, {
      message: `an error occurred on the server while updating tokens: ${error}`,
    });
  }
};
