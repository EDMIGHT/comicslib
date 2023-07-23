import { check } from 'express-validator';

export const createCommentValidators = [
  check('text')
    .trim()
    .isLength({ min: 1 })
    .withMessage('The minimum text length is 1 characters')
    .isLength({ max: 255 })
    .withMessage('The maximum text length is 255 characters'),
];
