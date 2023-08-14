import express from 'express';

import {
  createFolder,
  getFolder,
  getProfile,
  getUserFolders,
  updateComicsFolder,
  updateReadingHistory,
} from '@/controllers/user.controllers';
import { authentication, validation } from '@/middleware';
import { createFolderValidators } from '@/utils/validations/folder.validators';

const router = express.Router({ mergeParams: true });

router.get('/:login', getProfile);
router.get('/folders/:login/:folderId', getFolder);
router.get('/folders/:comicId', authentication, getUserFolders);

router.post('/folders', authentication, createFolderValidators, validation, createFolder);

router.patch('/reading-history', authentication, updateReadingHistory);
router.patch('/folders/:folderId/:comicId', authentication, updateComicsFolder);

export default router;
