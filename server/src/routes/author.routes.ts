import express from 'express';

import { createAuthor, getAllAuthors } from '@/controllers/author.controllers';
import { authentication, validation } from '@/middleware';
import { createAuthorValidators } from '@/utils/validations/author.validators';

const router = express.Router({ mergeParams: true });

router.get('/', getAllAuthors);

router.post('/', authentication, createAuthorValidators, validation, createAuthor);

export default router;
