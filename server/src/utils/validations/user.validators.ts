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
    .withMessage('Сomics must be passed as an array of strings with their id'),
  check('comics.*').isString().withMessage('Comics array must be a comics id of type string'),
];

export const updateBookmarkValidators = [
  check('comicId').exists().withMessage('Comic id is required field').trim(),
  check('chapterId').exists().withMessage('Chapter id is required field').trim(),
  check('pageNumber').exists().withMessage('Page number is required field').trim(),
];

export const updateFolderValidators = [
  check('title')
    .trim()
    .isLength({ min: 2 })
    .withMessage('The minimum title length is 2 characters')
    .isLength({ max: 190 })
    .withMessage('The maximum title length is 190 characters'),
  check('comics')
    .optional()
    .isArray()
    .withMessage('Comics must be passed as an array of strings with their id'),
  check('comics.*').isString().withMessage('Comics array must be a comics id of type string'),
];

export const updateUserValidators = [
  check('img')
    .optional()
    .trim()
    .isString()
    .withMessage('The picture must be in base64 format and the string'),
  check('name')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('The minimum name length is 2 characters')
    .isLength({ max: 190 })
    .withMessage('The maximum name length is 190 characters'),
  check('login')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('The minimum login length is 2 characters')
    .isLength({ max: 190 })
    .withMessage('The maximum login length is 190 characters'),
  check('password')
    .optional()
    .trim()
    .isLength({ min: 5 })
    .withMessage('The minimum password length is 5 characters')
    .isLength({ max: 190 })
    .withMessage('The maximum password length is 190 characters'),
];
