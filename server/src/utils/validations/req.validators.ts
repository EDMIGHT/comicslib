import { query } from 'express-validator';

export const paginationValidators = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .toInt()
    .withMessage('The page must be a positive number'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .toInt()
    .withMessage('Limit must be a positive integer between 1 and 100'),
];

export const sortValidators = [
  query('sort').optional().isString().withMessage('The sort field must be a string'),
  query('order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('The sort order field must be either "asc" or "desc"'),
];
