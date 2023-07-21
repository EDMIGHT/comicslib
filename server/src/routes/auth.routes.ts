import express from 'express';

import { authMe, login, register } from '@/controllers/auth.controller';
import { authentication } from '@/middleware/authentication.middleware';
import { validation } from '@/middleware/validation.middleware';
import { loginValidators, registerValidators } from '@/utils/validations/auth.validators';

const router = express.Router({ mergeParams: true });

router.get('/me', authentication, authMe);

router.post('/register', registerValidators, validation, register);
router.post('/login', loginValidators, validation, login);

export default router;
