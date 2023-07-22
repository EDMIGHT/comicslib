import express from 'express';

import { createComic, getComics } from '@/controllers/comic.controllers';
import { authentication, validation } from '@/middleware';
import { createComicValidators } from '@/utils/validations/comic.validators';

const router = express.Router({ mergeParams: true });

router.get('/', getComics);

router.post('/', authentication, createComicValidators, validation, createComic);

export default router;
