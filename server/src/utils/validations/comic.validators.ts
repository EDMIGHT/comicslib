import { check } from 'express-validator';

export const createComicValidators = [
  check('title')
    .trim()
    .isLength({ min: 2 })
    .withMessage('The minimum title length is 2 characters')
    .isLength({ max: 190 })
    .withMessage('The maximum title length is 190 characters'),
  check('statusId')
    .trim()
    .isLength({ min: 2 })
    .withMessage('The minimum title length is 2 characters')
    .isLength({ max: 190 })
    .withMessage('The maximum title length is 190 characters'),
  check('desc')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('The minimum desc length is 2 characters')
    .isLength({ max: 190 })
    .withMessage('The maximum desc length is 190 characters'),
  check('img')
    .optional()
    .isString()
    .withMessage('img must be a string')
    .trim()
    .isLength({ max: 190 })
    .withMessage('The maximum img length is 190 characters'),
];
