import express from 'express';

import { createGenre, getAllGenres, getGenre } from '@/controllers/genre.controllers';
import { authentication, validation } from '@/middleware';
import { createGenreValidators } from '@/utils/validations/genre.validators';

const router = express.Router({ mergeParams: true });

router.get('/', getAllGenres);
router.get('/:title', getGenre);

router.post('/', authentication, createGenreValidators, validation, createGenre);

export default router;
