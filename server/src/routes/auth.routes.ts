import express from 'express';

import { register } from '@/controllers/auth.controller';
import validation from '@/middleware/validation.middleware';
import { registerValidators } from '@/utils/validations/auth.validators';

const router = express.Router({ mergeParams: true });

router.post('/register', registerValidators, validation, register);
router.post('/login');

export default router;
