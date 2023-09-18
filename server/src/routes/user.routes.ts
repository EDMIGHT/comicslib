import express from 'express';

import {
  changePassword,
  clearAllBookmarks,
  deleteBookmark,
  deleteUser,
  getAllSubscribedComics,
  getAllUser,
  getBookmarks,
  getProfile,
  getUploads,
  getUserBookmarkByComic,
  updateBookmark,
  updateUser,
} from '@/controllers/user.controllers';
import { authentication, validation } from '@/middleware';
import { paginationValidators, sortValidators } from '@/utils/validations/req.validators';
import {
  getBookmarksValidators,
  getComicsForUserValidators,
  getUsersValidators,
  updateBookmarkValidators,
  updatePasswordValidators,
  updateUserValidators,
} from '@/utils/validations/user.validators';

const router = express.Router({ mergeParams: true });

router.get(
  '/all',
  paginationValidators,
  sortValidators,
  getUsersValidators,
  validation,
  getAllUser
);
router.get(
  '/bookmarks/:login',
  paginationValidators,
  sortValidators,
  getBookmarksValidators,
  validation,
  getBookmarks
);
router.get('/bookmarks/comic/:comicId', authentication, getUserBookmarkByComic);
router.get(
  '/comics-subscribed',
  authentication,
  paginationValidators,
  sortValidators,
  getComicsForUserValidators,
  validation,
  getAllSubscribedComics
);
router.get('/profiles/:login', getProfile);
router.get(
  '/uploads/:login',
  paginationValidators,
  sortValidators,
  getComicsForUserValidators,
  validation,
  getUploads
);

router.patch(
  '/bookmarks',
  authentication,
  updateBookmarkValidators,
  validation,
  updateBookmark
);
router.patch('/', authentication, updateUserValidators, validation, updateUser);
router.patch(
  '/password',
  authentication,
  updatePasswordValidators,
  validation,
  changePassword
);

router.delete('/bookmarks/comic/all', authentication, clearAllBookmarks);
router.delete('/bookmarks/comic/:comicId', authentication, deleteBookmark);
router.delete('/', authentication, deleteUser);

export default router;
