import express from 'express';

import {
  clearAllBookmarks,
  createFolder,
  deleteBookmark,
  getAllSubscribedComics,
  getAllUser,
  getBookmarks,
  getFolder,
  getProfile,
  getUploads,
  getUserBookmarkByComic,
  getUserFolders,
  getUserFoldersByComic,
  updateBookmark,
  updateComicsFolder,
  updateUser,
} from '@/controllers/user.controllers';
import { authentication, validation } from '@/middleware';
import {
  createFolderValidators,
  updateBookmarkValidators,
  updateUserValidators,
} from '@/utils/validations/user.validators';

const router = express.Router({ mergeParams: true });

router.get('/all', getAllUser);
router.get('/bookmarks/:login', getBookmarks);
router.get('/bookmarks/comic/:comicId', authentication, getUserBookmarkByComic);
router.get('/folders/u/:login', getUserFolders);
router.get('/folders/u/:login/:folderId', getFolder);
router.get('/folders/:comicId', authentication, getUserFoldersByComic);
router.get('/comics-subscribed', authentication, getAllSubscribedComics);
router.get('/profiles/:login', getProfile);
router.get('/uploads/:login', getUploads);

router.post('/folders', authentication, createFolderValidators, validation, createFolder);

router.patch(
  '/bookmarks',
  authentication,
  updateBookmarkValidators,
  validation,
  updateBookmark
);

router.patch('/folders/:folderId/:comicId', authentication, updateComicsFolder);
router.patch('/', authentication, updateUserValidators, validation, updateUser);

router.delete('/bookmarks/comic/all', authentication, clearAllBookmarks);
router.delete('/bookmarks/comic/:comicId', authentication, deleteBookmark);

export default router;
