import express from 'express';

const router = express.Router({ mergeParams: true });

router.post('/login');

export default router;
