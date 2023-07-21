import express from 'express';

import { login, register } from '@/controllers/auth.controller';
import { validation } from '@/middleware/validation.middleware';
import { loginValidators, registerValidators } from '@/utils/validations/auth.validators';

const router = express.Router({ mergeParams: true });

router.post('/register', registerValidators, validation, register);
router.post('/login', loginValidators, validation, login);

export default router;
