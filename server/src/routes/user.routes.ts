import express from 'express';

import {
  clearAllBookmarks,
  createFolder,
  deleteBookmark,
  getAllUser,
  getBookmarks,
  getFolder,
  getProfile,
  getUserBookmarkByComic,
  getUserFolders,
  updateBookmark,
  updateComicsFolder,
} from '@/controllers/user.controllers';
import { authentication, validation } from '@/middleware';
import {
  createFolderValidators,
  updateBookmarkValidators,
} from '@/utils/validations/user.validators';

const router = express.Router({ mergeParams: true });

router.get('/all', getAllUser);
router.get('/:login', getProfile);
router.get('/reading-history/:login', getBookmarks);
router.get('/reading-history/comic/:comicId', authentication, getUserBookmarkByComic);
router.get('/folders/:login/:folderId', getFolder);
router.get('/folders/:comicId', authentication, getUserFolders);

router.post('/folders', authentication, createFolderValidators, validation, createFolder);

router.patch(
  '/reading-history',
  authentication,
  updateBookmarkValidators,
  validation,
  updateBookmark
);
router.patch('/folders/:folderId/:comicId', authentication, updateComicsFolder);

router.delete('/reading-history/comic/all', authentication, clearAllBookmarks);
router.delete('/reading-history/comic/:comicId', authentication, deleteBookmark);

export default router;
