import { check } from 'express-validator';

export const createAuthorValidators = [
  check('login')
    .trim()
    .isLength({ min: 2 })
    .withMessage('The minimum login length is 2 characters')
    .isLength({ max: 190 })
    .withMessage('The maximum login length is 190 characters'),
  check('name')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('The minimum name length is 2 characters')
    .isLength({ max: 190 })
    .withMessage('The maximum name length is 190 characters'),
];
