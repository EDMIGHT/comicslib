import { VoteType } from '@prisma/client';
import { check, query } from 'express-validator';

import prisma from '@/db/prisma';

const commentSchema = prisma.comment.fields;
const commentVoteSchema = prisma.commentVote.fields;

const VoteEnum: VoteType[] = ['up', 'down'];

export const checkUserCommentsVotesValidators = [
  check('commentsIds')
    .exists()
    .isArray()
    .withMessage(
      'You should pass an array of comments to check if there are user votes for them'
    ),
  check('commentsIds.*').isString().withMessage('Comment IDs must be passed as strings'),
];

export const getCommentsValidators = [
  query('sort').optional().isIn([commentSchema.createdAt.name]),
];

export const createCommentValidators = [
  check(commentSchema.text.name)
    .trim()
    .isLength({ min: 1 })
    .withMessage('The minimum text length is 1 characters')
    .isLength({ max: 255 })
    .withMessage('The maximum text length is 255 characters'),
];

export const countCommentVoteValidators = [
  check(commentVoteSchema.type.name)
    .trim()
    .exists()
    .isIn(VoteEnum)
    .withMessage(
      `You can specify the vote type as only one of these values: ${VoteEnum.join(', ')}`
    ),
];
