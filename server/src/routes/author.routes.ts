import express from 'express';

import { createAuthor, getAllAuthors, getAuthor } from '@/controllers/author.controllers';
import { authentication, validation } from '@/middleware';
import {
  createAuthorValidators,
  getAllAuthorsValidators,
} from '@/utils/validations/author.validators';
import { paginationValidators, sortValidators } from '@/utils/validations/req.validators';

const router = express.Router({ mergeParams: true });

router.get(
  '/',
  paginationValidators,
  sortValidators,
  getAllAuthorsValidators,
  validation,
  getAllAuthors
);
router.get('/:login', getAuthor);

router.post('/', authentication, createAuthorValidators, validation, createAuthor);

export default router;
