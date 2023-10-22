import { check, query } from 'express-validator';

import { LIMITS } from '@/configs/general.configs';
import prisma from '@/db/prisma';

const comicSchema = prisma.comic.fields;

export const createComicValidators = [
  check(comicSchema.title.name)
    .trim()
    .isLength({ min: 2 })
    .withMessage('The minimum title length is 2 characters')
    .isLength({ max: LIMITS.maxStringLength })
    .withMessage(`The maximum title length is ${LIMITS.maxStringLength} characters`),
  check(comicSchema.statusId.name).exists().withMessage('Status id is required field').trim(),
  check(comicSchema.desc.name)
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('The maximum desc length is 2000 characters'),
  check(comicSchema.img.name)
    .optional()
    .isString()
    .withMessage(`Image must be a string`)
    .trim(),
];

export const getComicsValidators = [
  query('sort')
    .optional()
    .isIn([
      comicSchema.createdAt.name,
      comicSchema.updatedAt.name,
      comicSchema.releasedAt.name,
      'best',
      'popular',
      comicSchema.title.name,
    ])
    .withMessage(
      `The sort field can be: ${comicSchema.createdAt.name}, ${comicSchema.updatedAt.name}, ${comicSchema.releasedAt.name}, best, ${comicSchema.title.name}`
    ),
  query('genres')
    .optional()
    .isString()
    .withMessage('Genres must be a string separated by commas'),
  query('themes')
    .optional()
    .isString()
    .withMessage('Themes must be a string separated by commas'),
  query('authors')
    .optional()
    .isString()
    .withMessage('Authors must be a string separated by commas'),
  query('statuses')
    .optional()
    .isString()
    .withMessage('Statuses must be a string separated by commas'),
  query(comicSchema.title.name)
    .optional()
    .isString()
    .withMessage(`The ${comicSchema.title.name} must be a string`)
    .isLength({ max: LIMITS.maxStringLength })
    .withMessage(
      `The ${comicSchema.title.name} can be a maximum of ${LIMITS.maxStringLength} characters long`
    ),
  query('folderId').optional().isString().withMessage('Field "folderId" must be a string'),
  query('ratedUser').optional().isString().withMessage('Field "ratedUser" must be a string'),
  query('date')
    .optional()
    .isIn([
      '',
      comicSchema.createdAt.name,
      comicSchema.updatedAt.name,
      comicSchema.releasedAt.name,
    ])
    .withMessage(
      `The date field could be: ${comicSchema.createdAt.name}, ${comicSchema.updatedAt.name}, ${comicSchema.releasedAt.name}`
    ),
  query('startDate').optional().isString().withMessage('Field "startDate" must be a string'),
  query('endDate').optional().isString().withMessage('Field "endDate" must be a string'),
];

export const getComicsWithChaptersValidators = [
  query(comicSchema.title.name)
    .optional()
    .isLength({ max: LIMITS.maxStringLength })
    .withMessage(`The maximum comic title length is ${LIMITS.maxStringLength} characters`),
  query('sort')
    .optional()
    .trim()
    .isIn([
      comicSchema.createdAt.name,
      comicSchema.updatedAt.name,
      comicSchema.releasedAt.name,
      comicSchema.title.name,
    ])
    .withMessage(
      `Sorting can be by fields: ${comicSchema.createdAt.name}, ${comicSchema.updatedAt.name}, ${comicSchema.releasedAt.name},${comicSchema.title.name}`
    ),
];
