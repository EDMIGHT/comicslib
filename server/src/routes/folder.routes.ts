import express from 'express';

import {
  createFolder,
  deleteFolder,
  getFolder,
  getUserFolders,
  getUserFoldersByComic,
  getUserFoldersWithComicInfo,
  reorderFolders,
  updateComicsFolder,
  updateFolder,
} from '@/controllers/folder.controller';
import { authentication, validation } from '@/middleware';
import {
  createFolderValidators,
  reorderFoldersValidators,
  updateFolderValidators,
} from '@/utils/validations/folder.validators';

const router = express.Router({ mergeParams: true });

router.get('/folders/u', authentication, getUserFoldersWithComicInfo);
router.get('/folders/u/:login', getUserFolders);
router.get('/folders/:folderId', getFolder);
router.get('/folders/c/:comicId', authentication, getUserFoldersByComic);

router.post('/folders', authentication, createFolderValidators, validation, createFolder);

router.patch('/folders/:folderId/:comicId', authentication, updateComicsFolder);
router.patch(
  '/folders/reorder',
  authentication,
  reorderFoldersValidators,
  validation,
  reorderFolders
);
router.patch(
  '/folders/:folderId',
  authentication,
  updateFolderValidators,
  validation,
  updateFolder
);

router.delete('/folders/:folderId', authentication, deleteFolder);

export default router;
