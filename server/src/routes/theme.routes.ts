import express from 'express';

import { createTheme, getAllThemes, getTheme } from '@/controllers/theme.controllers';
import { authentication, validation } from '@/middleware';
import { createThemeValidators } from '@/utils/validations/theme.validators';

const router = express.Router({ mergeParams: true });

router.get('/', getAllThemes);
router.get('/:title', getTheme);

router.post('/', authentication, createThemeValidators, validation, createTheme);

export default router;
