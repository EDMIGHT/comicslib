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

router.get('/u', authentication, getUserFoldersWithComicInfo);
router.get('/u/:login', getUserFolders);
router.get('/:folderId', getFolder);
router.get('/c/:comicId', authentication, getUserFoldersByComic);

router.post('', authentication, createFolderValidators, validation, createFolder);

router.patch('/:folderId/:comicId', authentication, updateComicsFolder);
router.patch('/reorder', authentication, reorderFoldersValidators, validation, reorderFolders);
router.patch('/:folderId', authentication, updateFolderValidators, validation, updateFolder);

router.delete('/:folderId', authentication, deleteFolder);

export default router;
