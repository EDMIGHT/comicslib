import express from 'express';

import authRouter from './auth.routes';
import authorsRouter from './author.routes';
import chaptersRouter from './chapter.routes';
import comicsRouter from './comic.routes';
import commentsRouter from './comment.routes';
import genresRouter from './genre.routes';
import statusesRouter from './status.routes';
import uploadsRouter from './upload.routes';

const router = express.Router({ mergeParams: true });

router.use('/auth', authRouter);
router.use('/authors', authorsRouter);
router.use('/chapters', chaptersRouter);
router.use('/comics', comicsRouter);
router.use('/comments', commentsRouter);
router.use('/genres', genresRouter);
router.use('/statuses', statusesRouter);
router.use('/uploads', uploadsRouter);

export default router;
