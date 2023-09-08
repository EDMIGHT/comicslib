import express from 'express';

import {
  createComic,
  getComic,
  getComics,
  getRandom,
  getRatings,
  getUserRating,
  updateComicRating,
} from '@/controllers/comic.controllers';
import { authentication, validation } from '@/middleware';
import {
  createComicValidators,
  getComicsValidators,
} from '@/utils/validations/comic.validators';
import { paginationValidators, sortValidators } from '@/utils/validations/req.validators';

const router = express.Router({ mergeParams: true });

router.get(
  '/',
  paginationValidators,
  sortValidators,
  getComicsValidators,
  validation,
  getComics
);
router.get('/random', getRandom);
router.get('/:id', getComic);
router.get('/rating/:id', getRatings);
router.get('/rating/me/:id', authentication, getUserRating);

router.post('/', authentication, createComicValidators, validation, createComic);

router.patch('/rating/:id', authentication, updateComicRating);

export default router;
