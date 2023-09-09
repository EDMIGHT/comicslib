import express from 'express';

import {
  createChapter,
  getChaptersByComicId,
  getContentForComic,
  getPageByChapterId,
} from '@/controllers/chapter.controllers';
import { authentication, validation } from '@/middleware';
import { createChapterValidators } from '@/utils/validations/chapter.validators';
import { paginationValidators, sortValidators } from '@/utils/validations/req.validators';

const router = express.Router({ mergeParams: true });

router.get(
  '/:comicId',
  paginationValidators,
  sortValidators,
  validation,
  getChaptersByComicId
);
router.get('/content/:comicId', getContentForComic);
router.get('/:chapterId/:pageNumber', getPageByChapterId);

router.post('/', authentication, createChapterValidators, validation, createChapter);

export default router;
