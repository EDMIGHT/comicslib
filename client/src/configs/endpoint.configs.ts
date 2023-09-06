export const API_AUTH_URL = {
  signIn: '/auth/login',
  signUp: '/auth/register',
  tokens: '/auth/token',
  authMe: '/auth/me',
} as const;

export const API_COMICS_URL = {
  origin: '/comics',
  random: '/comics/random',
  rating: '/comics/rating',
  ratingUser: '/comics/rating/me',
} as const;

export const API_GENRES_URL = {
  origin: '/genres',
} as const;

export const API_AUTHORS_URL = {
  origin: '/authors',
} as const;

export const API_CHAPTERS_ENDPOINTS = {
  origin: '/chapters',
} as const;

export const API_STATUSES_ENDPOINTS = {
  origin: '/statuses',
} as const;

export const API_THEMES_ENDPOINTS = {
  origin: '/themes',
} as const;

export const API_COMMENTS_URL = {
  origin: '/comments',
} as const;

export const API_USERS_ENDPOINTS = {
  origin: '/users',
  profile: '/users/profiles',
  uploads: '/users/uploads',
  folders: '/users/folders',
  foldersUser: '/users/folders/u',
  foldersComic: '/users/folders/c',
  bookmark: '/users/bookmarks',
  bookmarkComic: '/users/bookmarks/comic',
  comicsSubscribed: '/users/comics-subscribed',
} as const;
