import {
  IConfigVariant,
  ISortVariants,
  NavigationLink,
  SiteConfig,
  SocialLink,
} from '@/types/configs.types';

export const SITE_SOCIAL_LINKS: readonly SocialLink[] = [
  {
    title: 'github',
    icon: 'github',
    href: 'https://github.com/EDMIGHT/comicslib',
  },
  {
    title: 'discord',
    icon: 'discord',
    href: 'https://discord.com/',
  },
  {
    title: 'twitter',
    icon: 'twitter',
    href: 'https://twitter.com/home',
  },
];

export const LIBRARY_NAVIGATION: NavigationLink[] = [
  {
    title: 'updates',
    href: '/library/updates',
  },
  {
    title: 'folders',
    href: '/library/folders',
  },
  {
    title: 'bookmarks',
    href: '/library/bookmarks',
  },
];

export const TITLES_NAVIGATION: NavigationLink[] = [
  {
    title: 'advanced search',
    href: '/comics',
  },
  {
    title: 'recently added',
    href: '/comics/recently-added',
  },
  {
    title: 'latest updates',
    href: '/comics/latest-updates',
  },
  {
    title: 'random',
    href: '/comics/random',
  },
];

export const COMMUNITY_NAVIGATION: NavigationLink[] = [
  {
    title: 'users',
    href: '/users',
  },
];

export const SITE_RULES_NAVIGATION: NavigationLink[] = [
  {
    title: 'rules',
    href: '/rules',
  },
  {
    title: 'privacy policy',
    href: '/privacy-policy',
  },
  {
    title: 'about us',
    href: '/about-us',
  },
];

export const SITE_CONFIG: SiteConfig = {
  name: 'comicslib',
  logo: 'logo',
  navigation: [
    {
      title: 'Home',
      href: '/',
      icon: 'home',
    },
    {
      title: 'Library',
      links: LIBRARY_NAVIGATION,
      isPrivate: true,
      icon: 'library',
    },
    {
      title: 'Titles',
      links: TITLES_NAVIGATION,
      icon: 'titles',
    },
    {
      title: 'Community',
      links: COMMUNITY_NAVIGATION,
      icon: 'community',
    },
    {
      title: 'comicslib',
      links: SITE_RULES_NAVIGATION,
      icon: 'rules',
    },
  ] as const,
  socials: SITE_SOCIAL_LINKS,
};

export const PROFILE_NAVIGATION: readonly NavigationLink[] = [
  {
    title: 'Rated',
    href: '',
    icon: 'star',
  },
  {
    title: 'Bookmarks',
    href: '/bookmarks',
    icon: 'bookmark',
  },
  {
    title: 'Uploads',
    href: '/uploads',
    icon: 'upload',
  },
];

export const AUTH_MENU_NAVIGATION: readonly NavigationLink[] = [
  {
    title: 'My folders',
    href: '/folders',
    icon: 'folder',
  },
  {
    title: 'My bookmarks',
    href: '/library/bookmarks',
    icon: 'history',
  },
];

export const SORT_VARIANTS: ISortVariants = {
  comics: [
    {
      label: 'Date Added: Old to new',
      field: 'createdAt',
      order: 'desc',
    },
    {
      label: 'Date Added: New to old',
      field: 'createdAt',
      order: 'asc',
    },
    {
      label: 'Update Date: Old to new',
      field: 'updatedAt',
      order: 'desc',
    },
    {
      label: 'Update Date: New to old',
      field: 'updatedAt',
      order: 'asc',
    },
    {
      label: 'Title: A to Z',
      field: 'title',
      order: 'asc',
    },
    {
      label: 'Title: Z to A',
      field: 'title',
      order: 'desc',
    },
    {
      label: 'Top: Best to worse',
      field: 'best',
      order: 'asc',
    },
    {
      label: 'Top: Worse to best',
      field: 'best',
      order: 'desc',
    },
    // {
    //   label: 'highest rating',
    //   field: 'avgRating',
    //   order: 'asc',
    // },
  ],
  users: [
    {
      label: 'recently registered',
      field: 'createdAt',
      order: 'desc',
    },
    {
      label: 'oldest registered',
      field: 'createdAt',
      order: 'asc',
    },

    {
      label: 'username ascending',
      field: 'login',
      order: 'asc',
    },
    {
      label: 'username descending',
      field: 'login',
      order: 'desc',
    },
  ],
};

export const PAGINATION_LIMIT_CONFIG = {
  chapters: 1,
  comics: 6,
  comments: 5,
  bookmarks: 6,
  users: 12,
} as const;

export const COMIC_RATING_CONFIG = {
  min: 1,
  max: 10,
} as const;

export const COMIC_DATE_FIELDS: readonly IConfigVariant[] = [
  {
    title: 'Added',
    field: 'createdAt',
  },
  {
    title: 'Updated',
    field: 'updatedAt',
  },
  {
    title: 'Published',
    field: 'publishedAt',
  },
];
