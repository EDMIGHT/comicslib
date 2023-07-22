import express from 'express';

import { uploadImg } from '@/controllers/upload.controllers';
import { upload } from '@/middleware';

const router = express.Router({ mergeParams: true });

router.post('/', upload.single('image'), uploadImg);

export default router;
