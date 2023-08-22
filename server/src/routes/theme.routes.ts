import express from 'express';

import { createTheme, getAllThemes } from '@/controllers/theme.controllers';
import { authentication, validation } from '@/middleware';
import { createThemeValidators } from '@/utils/validations/theme.validators';

const router = express.Router({ mergeParams: true });

router.get('/', getAllThemes);

router.post('/', authentication, createThemeValidators, validation, createTheme);

export default router;
