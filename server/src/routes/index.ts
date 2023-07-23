import express from 'express';

import authRouter from './auth.routes';
import authorsRouter from './author.routes';
import comicsRouter from './comic.routes';
import commentsRouter from './comment.routes';
import genresRouter from './genre.routes';
import uploadsRouter from './upload.routes';

const router = express.Router({ mergeParams: true });

router.use('/auth', authRouter);
router.use('/comics', comicsRouter);
router.use('/genres', genresRouter);
router.use('/authors', authorsRouter);
router.use('/uploads', uploadsRouter);
router.use('/comments', commentsRouter);

export default router;
