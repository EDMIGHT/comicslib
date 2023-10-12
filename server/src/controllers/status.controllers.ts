import { StatusName } from '@prisma/client';
import { Request, Response } from 'express';

import { StatusModel } from '@/models/status.model';
import { CustomResponse } from '@/utils/helpers/customResponse';
import { serverErrorResponse } from '@/utils/helpers/serverErrorResponse';

export const getAllStatuses = async (_: Request, res: Response): Promise<Response> => {
  try {
    const statuses = await StatusModel.getAll();

    return CustomResponse.ok(res, statuses);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error while receiving statuses on server side',
      error,
    });
  }
};

export const getStatus = async (req: Request, res: Response): Promise<Response> => {
  const { name } = req.params;

  try {
    const status = await StatusModel.getByName(name as StatusName);

    return CustomResponse.ok(res, status);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error while receiving status on server side',
      error,
    });
  }
};

export const createStatus = async (req: Request, res: Response): Promise<Response> => {
  try {
    const status = await StatusModel.create({ ...req.body });

    return CustomResponse.created(res, status);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error while creating status on server side',
      error,
    });
  }
};
