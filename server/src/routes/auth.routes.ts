import express from 'express';

import { authMe, signIn, signOut, signUp, updateTokens } from '@/controllers/auth.controllers';
import { authentication, validation } from '@/middleware';
import { signInValidators, signUpValidators } from '@/utils/validations/auth.validators';

const router = express.Router({ mergeParams: true });

router.get('/me', authentication, authMe);

router.post('/sign-up', signUpValidators, validation, signUp);
router.post('/sign-in', signInValidators, validation, signIn);
router.post('/token', updateTokens);

router.delete('/sign-out', authentication, signOut);

export default router;
