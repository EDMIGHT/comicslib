import { check, query } from 'express-validator';

import { LIMITS } from '@/configs/limits.configs';
import prisma from '@/db/prisma';

const userSchema = prisma.user.fields;
const bookmarkSchema = prisma.bookmark.fields;
const comicSchema = prisma.comic.fields;

export const updateBookmarkValidators = [
  check(bookmarkSchema.comicId.name).exists().withMessage('Comic id is required field').trim(),
  check(bookmarkSchema.chapterId.name)
    .exists()
    .withMessage('Chapter id is required field')
    .trim(),
  check(bookmarkSchema.pageNumber.name)
    .exists()
    .withMessage('Page number is required field')
    .trim(),
];

export const updateUserValidators = [
  check(userSchema.img.name)
    .optional()
    .trim()
    .isString()
    .withMessage('The picture must be in base64 format and the string'),
  check(userSchema.name.name)
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('The minimum name length is 2 characters')
    .isLength({ max: LIMITS.maxStringLength })
    .withMessage(`The maximum name length is ${LIMITS.maxStringLength} characters`),
  check(userSchema.login.name)
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('The minimum login length is 2 characters')
    .isLength({ max: LIMITS.maxStringLength })
    .withMessage(`The maximum login length is ${LIMITS.maxStringLength} characters`),
  check(userSchema.password.name)
    .optional()
    .trim()
    .isLength({ min: 5 })
    .withMessage('The minimum password length is 5 characters')
    .isLength({ max: LIMITS.maxStringLength })
    .withMessage(`The maximum password length is ${LIMITS.maxStringLength} characters`),
];

export const getUsersValidators = [
  query(userSchema.login.name)
    .optional()
    .isLength({ max: LIMITS.maxStringLength })
    .withMessage(`The maximum login length is ${LIMITS.maxStringLength} characters`),
  query('sort')
    .optional()
    .trim()
    .isIn([userSchema.createdAt.name, userSchema.login.name])
    .withMessage(
      `Sorting can be by fields: ${userSchema.createdAt.name}, ${userSchema.login.name}`
    ),
];

export const getBookmarksValidators = [
  query(comicSchema.title.name)
    .optional()
    .isLength({ max: LIMITS.maxStringLength })
    .withMessage(`The maximum comic title length is ${LIMITS.maxStringLength} characters`),
  query('sort')
    .optional()
    .trim()
    .isIn([bookmarkSchema.updatedAt.name])
    .withMessage(`Sorting can be by fields: ${bookmarkSchema.updatedAt.name}`),
];

export const getComicsForUserValidators = [
  query(comicSchema.title.name)
    .optional()
    .isLength({ max: LIMITS.maxStringLength })
    .withMessage(`The maximum comic title length is ${LIMITS.maxStringLength} characters`),
  query('sort')
    .optional()
    .trim()
    .isIn([comicSchema.createdAt.name, comicSchema.updatedAt.name, comicSchema.title.name])
    .withMessage(
      `Sorting can be by fields: ${comicSchema.createdAt.name}, ${comicSchema.updatedAt.name}, ${comicSchema.title.name}`
    ),
];
