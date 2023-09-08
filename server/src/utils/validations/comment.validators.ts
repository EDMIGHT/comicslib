import { check, query } from 'express-validator';

import prisma from '@/db/prisma';

const commentSchema = prisma.comment.fields;

export const createCommentValidators = [
  check(commentSchema.text.name)
    .trim()
    .isLength({ min: 1 })
    .withMessage('The minimum text length is 1 characters')
    .isLength({ max: 255 })
    .withMessage('The maximum text length is 255 characters'),
];

export const getCommentsValidators = [
  query('sort').optional().isIn([commentSchema.createdAt.name]),
];
