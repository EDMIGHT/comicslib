import express from 'express';

import { createComment } from '@/controllers/comment.controllers';
import { authentication, validation } from '@/middleware';
import { createCommentValidators } from '@/utils/validations/comment.validators';

const router = express.Router();

router.post('/:comicId', authentication, createCommentValidators, validation, createComment);

export default router;
