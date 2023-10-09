import express from 'express';

import {
  checkCommentsVotes,
  createComment,
  createVoteForComment,
  getComments,
} from '@/controllers/comment.controllers';
import { authentication, validation } from '@/middleware';
import {
  checkUserCommentsVotesValidators,
  createCommentValidators,
  createCommentVoteValidators,
} from '@/utils/validations/comment.validators';
import { paginationValidators, sortValidators } from '@/utils/validations/req.validators';

const router = express.Router();

router.get('/:comicId', paginationValidators, sortValidators, validation, getComments);

router.post(
  '/check',
  authentication,
  checkUserCommentsVotesValidators,
  validation,
  checkCommentsVotes
);
router.post('/:comicId', authentication, createCommentValidators, validation, createComment);
router.post(
  '/:commentId/vote',
  authentication,
  createCommentVoteValidators,
  validation,
  createVoteForComment
);

export default router;
