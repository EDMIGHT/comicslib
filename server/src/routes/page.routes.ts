import express from 'express';

import { createPage, getPageByChapterId } from '@/controllers/page.controllers';
import { authentication, validation } from '@/middleware';

const router = express.Router({ mergeParams: true });

router.get('/:chapterId/:pageNumber', getPageByChapterId);

router.post('/', authentication, validation, createPage);

export default router;
