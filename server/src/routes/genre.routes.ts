import express from 'express';

import { createGenre } from '@/controllers/genre.controllers';
import { authentication, validation } from '@/middleware';
import { createGenreValidators } from '@/utils/validations/genre.validators';

const router = express.Router({ mergeParams: true });

router.post('/', authentication, createGenreValidators, validation, createGenre);

export default router;
