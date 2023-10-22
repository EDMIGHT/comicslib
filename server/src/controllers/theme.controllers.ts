import { Request, Response } from 'express';

import { ThemeModel } from '@/models/theme.model';
import { CustomResponse } from '@/utils/helpers/custom-response';
import { serverErrorResponse } from '@/utils/helpers/serverErrorResponse';

export const getAllThemes = async (_: Request, res: Response): Promise<Response> => {
  try {
    const themes = await ThemeModel.getAll();

    return CustomResponse.ok(res, themes);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error while receiving themes on server side',
      error,
    });
  }
};

export const getTheme = async (req: Request, res: Response): Promise<Response> => {
  const { title } = req.params;

  try {
    const theme = await ThemeModel.getByTitle(title);

    return CustomResponse.ok(res, theme);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error while receiving theme on server side',
      error,
    });
  }
};

export const createTheme = async (req: Request, res: Response): Promise<Response> => {
  try {
    const status = await ThemeModel.create({ ...req.body });

    return CustomResponse.created(res, status);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error while creating theme on server side',
      error,
    });
  }
};
