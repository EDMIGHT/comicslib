import { check } from 'express-validator';

export const createChapterValidators = [
  check('title')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('The minimum title length is 2 characters')
    .isLength({ max: 190 })
    .withMessage('The maximum title length is 190 characters'),
  check('number').isInt({ min: 0 }).withMessage('Chapter number cannot be lower than 0'),
  check('comicId').trim().exists().withMessage('Comic id is required field'),
];
