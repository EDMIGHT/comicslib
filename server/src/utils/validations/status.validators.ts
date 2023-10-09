import { StatusName } from '@prisma/client';
import { check } from 'express-validator';

const NameEnum: StatusName[] = ['cancelled', 'completed', 'hiatus', 'ongoing'];

export const createStatusValidators = [
  check('name')
    .trim()
    .isIn(Object.values(NameEnum))
    .withMessage(
      'status can only have one of these names: ongoing, completed, cancelled, hiatus'
    ),
];
