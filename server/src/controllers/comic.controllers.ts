import { Request, Response } from 'express';

import { ComicModel } from '@/models/comic.model';
import { CustomResponse } from '@/utils/helpers/customResponse';
import { serverErrorResponse } from '@/utils/helpers/serverErrorResponse';

export const createComic = async (req: Request, res: Response): Promise<Response> => {
  try {
    const comic = await ComicModel.create({ ...req.body });

    return CustomResponse.created(res, comic);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error when creating a comic on the server side',
      error,
    });
  }
};

// export const getComics = async (req: Request, res: Response): Promise<Response> => {
//   try {
//     const comics = await ComicModel.
//   } catch (error) {
//     return serverErrorResponse({
//       res,
//       message: 'error while fetching comics on server side',
//       error,
//     });
//   }
// };
