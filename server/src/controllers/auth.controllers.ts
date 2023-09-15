import axios from 'axios';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import { LIMITS } from '@/configs/limits.configs';
import { SessionModel } from '@/models/session.model';
import { UserModel } from '@/models/user.model';
import tokenService from '@/services/token.service';
import { IResponseGithubAuth, IResponseGoogleAuth } from '@/types/auth.types';
import {
  clearAuthCookieFromResponse,
  setAuthCookieToResponse,
} from '@/utils/helpers/auth-cookie-response.helper';
import { createResponseUser } from '@/utils/helpers/create-response-user';
import { createUniqueLogin } from '@/utils/helpers/create-unique-login';
import { CustomResponse } from '@/utils/helpers/customResponse';
import { isTokenInvalid } from '@/utils/helpers/isTokenInvalid';

// google
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const GOOGLE_REDIRECT_URL = process.env.GOOGLE_AUTH_REDIRECT_URL!;

// github
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;

const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN!;

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
    if (!existedUser.password) {
      return CustomResponse.forbidden(res, {
        message:
          'You cannot access an account created using an external provider in this way.',
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
      clearAuthCookieFromResponse(res);

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

export const googleCallback = async (
  req: Request,
  res: Response
): Promise<void | Response<any, Record<string, any>>> => {
  const { code } = req.query;

  try {
    const { data: tokenResponse } = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_REDIRECT_URL,
      grant_type: 'authorization_code',
    });

    const { access_token } = tokenResponse;

    const { data: googleUserData } = await axios.get<IResponseGoogleAuth>(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`
    );

    const existedUser = await UserModel.getByProvider('google', googleUserData.id);

    if (existedUser) {
      const tokens = tokenService.createTokens({
        id: existedUser.id,
        login: existedUser.login,
      });
      tokenService.save({
        userId: existedUser.id,
        refreshToken: tokens.refreshToken,
      });

      const resWithCookie = setAuthCookieToResponse(res, tokens);

      return resWithCookie.redirect(CLIENT_DOMAIN);
    }

    const preparedLogin = googleUserData.email
      .split('@')[0]
      .substring(0, LIMITS.maxStringLength);

    const isExistLogin = await UserModel.getByLogin(preparedLogin);

    const uniqueLogin = isExistLogin ? await createUniqueLogin(preparedLogin) : preparedLogin;

    const user = await UserModel.create({
      login: uniqueLogin,
      password: null,
      provider: 'google',
      providerId: googleUserData.id,
      img: googleUserData.picture,
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

    return resWithCookie.redirect(CLIENT_DOMAIN);
  } catch (error) {
    return CustomResponse.serverError(res, {
      message: `An error occurred on the server side when logging in using Google.`,
    });
  }
};

export const githubRedirect = async (_: Request, res: Response): Promise<void> => {
  return res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=http://localhost:3001/api/auth/callback/github&scope=user`
  );
};

export const githubCallback = async (
  req: Request,
  res: Response
): Promise<void | Response<any, Record<string, any>>> => {
  const { code } = req.query;

  try {
    const { data: githubResponse } = await axios.post(
      'https://github.com/login/oauth/access_token',
      null,
      {
        headers: {
          Accept: 'application/json',
        },
        params: {
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          redirect_uri: 'http://localhost:3001/api/auth/callback/github',
          code,
        },
      }
    );

    const { access_token } = githubResponse;

    const { data: githubUserData } = await axios.get<IResponseGithubAuth>(
      'https://api.github.com/user',
      {
        headers: {
          Authorization: `token ${access_token}`,
        },
      }
    );

    const existedUser = await UserModel.getByProvider('github', githubUserData.id.toString());

    if (existedUser) {
      const tokens = tokenService.createTokens({
        id: existedUser.id,
        login: existedUser.login,
      });
      tokenService.save({
        userId: existedUser.id,
        refreshToken: tokens.refreshToken,
      });

      const resWithCookie = setAuthCookieToResponse(res, tokens);

      return resWithCookie.redirect(CLIENT_DOMAIN);
    }

    const preparedLogin = githubUserData.login.substring(0, LIMITS.maxStringLength);

    const isExistLogin = await UserModel.getByLogin(preparedLogin);

    const uniqueLogin = isExistLogin ? await createUniqueLogin(preparedLogin) : preparedLogin;

    const user = await UserModel.create({
      login: uniqueLogin,
      password: null,
      provider: 'github',
      providerId: githubUserData.id.toString(),
      img: githubUserData.avatar_url,
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

    return resWithCookie.redirect(CLIENT_DOMAIN);
  } catch (error) {
    return CustomResponse.serverError(res, {
      message: `An error occurred on the server side when logging in using Github.`,
    });
  }
};
