import { check, query } from 'express-validator';

import { LIMITS } from '@/configs/limits.configs';
import prisma from '@/db/prisma';

const chapterSchema = prisma.chapter.fields;

export const createChapterValidators = [
  check(chapterSchema.title.name)
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('The minimum title length is 2 characters')
    .isLength({ max: LIMITS.maxStringLength })
    .withMessage(`The maximum title length is ${LIMITS.maxStringLength} characters`),
  check(chapterSchema.number.name)
    .isInt({ min: 0 })
    .withMessage('Chapter number cannot be lower than 0'),
  check(chapterSchema.comicId.name).exists().withMessage('Comic id is required field').trim(),
];

export const getChaptersByComicIdValidators = [
  query('sort')
    .optional()
    .trim()
    .isIn([chapterSchema.number.name])
    .withMessage(`Sorting can be by fields: ${chapterSchema.number.name}`),
];
