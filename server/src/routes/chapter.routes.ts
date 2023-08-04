import express from 'express';

import { createChapter, getChaptersByComicId } from '@/controllers/chapter.controllers';
import { authentication, validation } from '@/middleware';
import { createChapterValidators } from '@/utils/validations/chapter.validators';

const router = express.Router({ mergeParams: true });

router.get('/:comicId', getChaptersByComicId);

router.post('/', authentication, createChapterValidators, validation, createChapter);

export default router;
