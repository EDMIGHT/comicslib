import { check } from 'express-validator';

export const createFolderValidators = [
  check('title')
    .trim()
    .isLength({ min: 2 })
    .withMessage('The minimum title length is 2 characters')
    .isLength({ max: 190 })
    .withMessage('The maximum title length is 190 characters'),
  check('comics')
    .optional()
    .isArray()
    .withMessage('comics must be passed as an array of strings with their id'),
];

export const updateBookmarkValidators = [
  check('comicId').exists().withMessage('comic id is required field').trim(),
  check('chapterId').exists().withMessage('chapter id is required field').trim(),
  check('pageNumber').exists().withMessage('page number is required field').trim(),
];
