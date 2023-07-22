import { Request, Response } from 'express';

export const uploadImg = (req: Request, res: Response): Response => {
  const serverAddress = `${req.protocol}://${req.get('host')}`;

  return res.send({
    imgURL: `${serverAddress}/uploads/${req.file?.originalname}`,
  });
};
