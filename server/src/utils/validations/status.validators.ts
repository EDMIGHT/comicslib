import { StatusName } from '@prisma/client';
import { check } from 'express-validator';

type StatusEnum = {
  [key in StatusName]: StatusName;
};

const NameEnum: StatusEnum = {
  ongoing: 'ongoing',
  completed: 'completed',
  cancelled: 'cancelled',
  hiatus: 'hiatus',
};

export const createStatusValidators = [
  check('name')
    .trim()
    .isIn(Object.values(NameEnum))
    .withMessage(
      'status can only have one of these names: ongoing, completed, cancelled, hiatus'
    ),
];
