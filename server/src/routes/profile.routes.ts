import express from 'express';

import { createFolder, getProfile } from '@/controllers/profile.controllers';
import { authentication, validation } from '@/middleware';
import { createFolderValidators } from '@/utils/validations/folder.validators';

const router = express.Router({ mergeParams: true });

router.get('/:login', getProfile);
router.get('/folders/:login/:folderId');

router.post('/folders', authentication, createFolderValidators, validation, createFolder);

export default router;
