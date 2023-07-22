import { check } from 'express-validator';

export const createAuthorValidators = [
  check('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('The minimum name length is 2 characters')
    .isLength({ max: 190 })
    .withMessage('The maximum name length is 190 characters'),
];
