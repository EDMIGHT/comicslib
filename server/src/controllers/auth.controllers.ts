import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import { SessionModel } from '@/models/session.model';
import { UserModel } from '@/models/user.model';
import tokenService from '@/services/token.service';
import {
  clearAuthCookieFromResponse,
  setAuthCookieToResponse,
} from '@/utils/helpers/auth-cookie-response.helper';
import { createResponseUser } from '@/utils/helpers/createResponseUser';
import { CustomResponse } from '@/utils/helpers/customResponse';
import { isTokenInvalid } from '@/utils/helpers/isTokenInvalid';

export const signUp = async (req: Request, res: Response): Promise<Response> => {
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

    const resWithCookie = setAuthCookieToResponse(res, tokens);

    return CustomResponse.created(resWithCookie, null);
  } catch (error) {
    return CustomResponse.serverError(res, {
      message: 'an error occurred during registration on the server side',
    });
  }
};

export const signIn = async (req: Request, res: Response): Promise<Response> => {
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

    const resWithCookie = setAuthCookieToResponse(res, tokens);

    return CustomResponse.created(resWithCookie, null);
  } catch (error) {
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

    const tokens = tokenService.createTokens({
      id: tokenPayload.id,
      login: tokenPayload.login,
    });
    await tokenService.save({
      userId: tokenPayload.id,
      refreshToken: tokens.refreshToken,
    });

    const resWithCookie = setAuthCookieToResponse(res, tokens);

    return CustomResponse.ok(resWithCookie, null);
  } catch (error) {
    return CustomResponse.serverError(res, {
      message: `an error occurred on the server while updating tokens: ${error}`,
    });
  }
};

export const signOut = async (req: Request, res: Response): Promise<Response> => {
  try {
    await SessionModel.delete({
      userId: req.user.id,
    });

    clearAuthCookieFromResponse(res);

    return CustomResponse.ok(res, null);
  } catch (error) {
    return CustomResponse.serverError(res, {
      message: `server side error when logging out`,
    });
  }
};
