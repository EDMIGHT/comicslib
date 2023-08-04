import express from 'express';

import { uploadImg } from '@/controllers/upload.controllers';
import { authentication, upload } from '@/middleware';

const router = express.Router({ mergeParams: true });

router.post('/', authentication, upload.single('image'), uploadImg);

export default router;
