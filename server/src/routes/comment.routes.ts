import express from 'express';

import { createComment, getComments } from '@/controllers/comment.controllers';
import { authentication, validation } from '@/middleware';
import { createCommentValidators } from '@/utils/validations/comment.validators';
import { paginationValidators, sortValidators } from '@/utils/validations/req.validators';

const router = express.Router();

router.get('/:comicId', paginationValidators, sortValidators, validation, getComments);

router.post('/:comicId', authentication, createCommentValidators, validation, createComment);

export default router;
