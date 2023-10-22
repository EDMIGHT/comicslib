import { Response } from 'express';

import { CustomResponse } from './custom-response';

interface IServerErrorResponseArg {
  res: Response;
  message: string;
  error: any;
}

export const serverErrorResponse = ({
  error,
  message,
  res,
}: IServerErrorResponseArg): Response => {
  console.error(error);
  return CustomResponse.serverError(res, {
    message,
  });
};
