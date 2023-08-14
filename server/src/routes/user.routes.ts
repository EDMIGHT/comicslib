import express from 'express';

import {
  createFolder,
  getFolder,
  getProfile,
  getReadingHistory,
  getUserFolders,
  updateComicsFolder,
  updateReadingHistory,
} from '@/controllers/user.controllers';
import { authentication, validation } from '@/middleware';
import {
  createFolderValidators,
  updateReadingHistoryValidators,
} from '@/utils/validations/user.validators';

const router = express.Router({ mergeParams: true });

router.get('/:login', getProfile);
router.get('/reading-history/:login', getReadingHistory);
router.get('/folders/:login/:folderId', getFolder);
router.get('/folders/:comicId', authentication, getUserFolders);

router.post('/folders', authentication, createFolderValidators, validation, createFolder);

router.patch(
  '/reading-history',
  authentication,
  updateReadingHistoryValidators,
  validation,
  updateReadingHistory
);
router.patch('/folders/:folderId/:comicId', authentication, updateComicsFolder);

export default router;
