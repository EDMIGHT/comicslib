import express from 'express';

import { createComic } from '@/controllers/comic.controllers';
import { authentication } from '@/middleware/authentication.middleware';
import { validation } from '@/middleware/validation.middleware';
import { createComicValidators } from '@/utils/validations/comic.validators';

const router = express.Router({ mergeParams: true });

router.post('/', authentication, createComicValidators, validation, createComic);

export default router;
