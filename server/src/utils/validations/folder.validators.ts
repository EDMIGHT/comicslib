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

export const reorderFoldersValidators = [
  check('folders')
    .optional()
    .isArray()
    .withMessage('The array of folders must be passed as an array of strings with their id.'),
  check('folders.*')
    .isString()
    .withMessage('The folder array element must be a folder ID of string type.'),
];
