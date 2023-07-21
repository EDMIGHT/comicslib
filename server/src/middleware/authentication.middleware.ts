import { NextFunction, Request, Response } from 'express';

import { UserModel } from '@/models/user.model';
import tokenService from '@/services/token.service';
import { CustomResponse } from '@/utils/helpers/customResponse';

export const authentication = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      return CustomResponse.unauthorized(response, {
        message: 'unauthorized access',
      });
    }

    const dataFromToken = tokenService.verifyAccessToken(token);

    if (
      dataFromToken &&
      dataFromToken.exp &&
      dataFromToken.exp > Math.floor(Date.now() / 1000)
    ) {
      const existedUser = await UserModel.getById(dataFromToken.id);
      if (existedUser) {
        request.user = existedUser;
        return next();
      } else {
        return CustomResponse.unauthorized(response, {
          message: 'request from non-existent user',
        });
      }
    } else {
      return CustomResponse.unauthorized(response, {
        message: 'unauthorized access, token expired',
      });
    }
  } catch (error) {
    return CustomResponse.serverError(response, {
      message: 'an error occurred while authenticating on the server side',
    });
  }
};
