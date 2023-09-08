import { check, query } from 'express-validator';

import { LIMITS } from '@/configs/limits.configs';
import prisma from '@/db/prisma';

const authorSchema = prisma.author.fields;

export const createAuthorValidators = [
  check(authorSchema.login.name)
    .trim()
    .isLength({ min: 2 })
    .withMessage('The minimum login length is 2 characters')
    .isLength({ max: LIMITS.maxStringLength })
    .withMessage(`The maximum login length is ${LIMITS.maxStringLength} characters`),
  check(authorSchema.name.name)
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('The minimum name length is 2 characters')
    .isLength({ max: LIMITS.maxStringLength })
    .withMessage(`The maximum name length is ${LIMITS.maxStringLength} characters`),
];

export const getAllAuthorsValidators = [
  query('sort')
    .optional()
    .trim()
    .isIn([authorSchema.login.name])
    .withMessage(`Sorting can be by fields: ${authorSchema.login.name}`),
  query(authorSchema.login.name)
    .optional()
    .isString()
    .isLength({ max: LIMITS.maxStringLength })
    .withMessage(`The maximum login length is ${LIMITS.maxStringLength} characters`)
    .trim(),
];
