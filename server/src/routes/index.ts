import express from 'express';

import authRouter from './auth.routes';
import comicsRouter from './comic.routes';

const router = express.Router({ mergeParams: true });

router.use('/auth', authRouter);
router.use('/comics', comicsRouter);

export default router;
