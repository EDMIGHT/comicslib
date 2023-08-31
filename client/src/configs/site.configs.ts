import {
  IConfigVariant,
  ISortVariants,
  NavigationLink,
  SiteConfig,
  SocialLink,
} from '@/types/configs.types';

import { HREFS } from './href.configs';

export const SITE_THEMES: string[] = ['light', 'dark', 'gray'];

export const SITE_SOCIAL_LINKS: readonly SocialLink[] = [
  {
    title: 'github',
    icon: 'github',
    href: HREFS.socials.github,
  },
  {
    title: 'discord',
    icon: 'discord',
    href: HREFS.socials.discord,
  },
  {
    title: 'twitter',
    icon: 'twitter',
    href: HREFS.socials.twitter,
  },
];

export const LIBRARY_NAVIGATION: NavigationLink[] = [
  {
    title: 'updates',
    href: HREFS.library.updates,
  },
  {
    title: 'folders',
    href: HREFS.library.folders,
  },
  {
    title: 'bookmarks',
    href: HREFS.library.bookmarks,
  },
];

export const TITLES_NAVIGATION: NavigationLink[] = [
  {
    title: 'Advanced Search',
    href: HREFS.titles.advancedSearch,
  },
  {
    title: 'Recently Added',
    href: HREFS.titles.recentlyAdded,
  },
  {
    title: 'Latest Updates',
    href: HREFS.titles.latestUpdates,
  },
  {
    title: 'Random',
    href: HREFS.titles.random,
  },
  {
    title: 'Create Title',
    href: HREFS.create.title,
  },
];

export const COMMUNITY_NAVIGATION: NavigationLink[] = [
  {
    title: 'users',
    href: HREFS.community.users,
  },
];

export const INFO_PAGE_NAVIGATION: NavigationLink[] = [
  {
    title: 'rules',
    href: HREFS.infoPage.rules,
  },
  {
    title: 'privacy policy',
    href: HREFS.infoPage.privacyPolicy,
  },
  {
    title: 'about us',
    href: HREFS.infoPage.aboutUs,
  },
];

export const SITE_META = {
  og: {
    page: '/api/meta/og',
  },
};

export const SITE_CONFIG: SiteConfig = {
  name: 'comicslib',
  desc: 'web application whose purpose is to provide comics viewing services',
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
      links: INFO_PAGE_NAVIGATION,
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
    href: HREFS.library.folders,
    icon: 'folder',
  },
  {
    title: 'My bookmarks',
    href: HREFS.library.bookmarks,
    icon: 'history',
  },
];

export const SORT_VARIANTS: ISortVariants = {
  comics: [
    {
      label: 'Date Added: New to old',
      field: 'createdAt',
      order: 'desc',
    },
    {
      label: 'Date Added: Old to new',
      field: 'createdAt',
      order: 'asc',
    },
    {
      label: 'Update Date: New to old',
      field: 'updatedAt',
      order: 'desc',
    },
    {
      label: 'Update Date: Old to new',
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
  chapters: 5,
  comics: 6,
  comments: 5,
  bookmarks: 6,
  users: 12,
} as const;
