import express from 'express';

import { createComic, getComic, getComics } from '@/controllers/comic.controllers';
import { authentication, validation } from '@/middleware';
import { createComicValidators } from '@/utils/validations/comic.validators';

const router = express.Router({ mergeParams: true });

router.get('/', getComics);
router.get('/:id', getComic);

router.post('/', authentication, createComicValidators, validation, createComic);

export default router;
