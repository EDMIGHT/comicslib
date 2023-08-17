export const PUBLIC_URL = {
  signIn: '/sign-in',
};

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
};

export const API_AUTHORS_URL = {
  origin: '/authors',
};

export const API_CHAPTERS_URL = {
  origin: '/chapters',
};

export const API_STATUSES_URL = {
  origin: '/statuses',
};

export const API_PAGES_URL = {
  origin: '/pages',
};

export const API_COMMENTS_URL = {
  origin: '/comments',
};

export const API_USERS_ENDPOINTS = {
  origin: '/users',
  profile: '/users/profiles',
  folders: '/users/folders',
  foldersUser: '/users/folders/u',
  bookmark: '/users/reading-history',
  bookmarkComic: '/users/reading-history/comic',
  comicsSubscribed: '/users/comics-subscribed',
} as const;
