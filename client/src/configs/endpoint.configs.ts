export const API_AUTH_URL = {
  signIn: '/auth/sign-in',
  signUp: '/auth/sign-up',
  signOut: '/auth/sign-out',
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
  content: '/chapters/content',
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
  bookmark: '/users/bookmarks',
  bookmarkComic: '/users/bookmarks/comic',
  comicsSubscribed: '/users/comics-subscribed',
} as const;

export const API_FOLDERS_ENDPOINTS = {
  origin: '/folders',
  user: '/folders/u',
  comic: '/folders/c',
} as const;

export const ENDPOINTS = {
  auth: API_AUTH_URL,
  authors: API_AUTHORS_URL,
  comments: API_COMMENTS_URL,
  comics: API_COMICS_URL,
  chapters: API_CHAPTERS_ENDPOINTS,
  folders: API_FOLDERS_ENDPOINTS,
  genres: API_GENRES_URL,
  themes: API_THEMES_ENDPOINTS,
  users: API_USERS_ENDPOINTS,
  statuses: API_STATUSES_ENDPOINTS,
} as const;
