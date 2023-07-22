import express from 'express';

import { createComic } from '@/controllers/comic.controllers';
import { authentication, validation } from '@/middleware';
import { createComicValidators } from '@/utils/validations/comic.validators';

const router = express.Router({ mergeParams: true });

router.get('/');

router.post('/', authentication, createComicValidators, validation, createComic);

export default router;
