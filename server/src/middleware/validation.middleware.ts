import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { CustomResponse } from '@/utils/helpers/customResponse';

export const validation = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const errors = validationResult(request);

  if (errors.isEmpty()) {
    return next();
  } else {
    return CustomResponse.badRequest(response, {
      message: 'invalid request',
      details: errors.array(),
      body: {
        ...request.body,
      },
      query: {
        ...request.query,
      },
    });
  }
};
