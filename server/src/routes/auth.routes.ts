import express from 'express';

import { authMe, login, register, updateTokens } from '@/controllers/auth.controllers';
import { authentication, validation } from '@/middleware';
import { loginValidators, registerValidators } from '@/utils/validations/auth.validators';

const router = express.Router({ mergeParams: true });

router.get('/me', authentication, authMe);

router.post('/register', registerValidators, validation, register);
router.post('/login', loginValidators, validation, login);
router.post('/token', updateTokens);

export default router;
