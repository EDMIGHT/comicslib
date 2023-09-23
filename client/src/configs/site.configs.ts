import {
  COMIC_SORT_VARIANTS,
  COMIC_WITH_CHAPTERS_SORT_VARIANTS,
} from '@/configs/comic.configs';
import { ISortVariants, NavigationLink, SiteConfig, SocialLink } from '@/types/configs.types';

import { HREFS } from './href.configs';

export enum ESITE_THEMES {
  LIGHT = 'light',
  DARK = 'dark',
  GRAY = 'gray',
}

export const SITE_THEMES: ESITE_THEMES[] = [
  ESITE_THEMES.LIGHT,
  ESITE_THEMES.DARK,
  ESITE_THEMES.GRAY,
];

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
    title: 'Updates',
    href: HREFS.library.updates,
  },
  {
    title: 'Folders',
    href: HREFS.library.folders,
  },
  {
    title: 'Bookmarks',
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
    title: 'Users',
    href: HREFS.community.users,
  },
];

export const INFO_PAGE_NAVIGATION: NavigationLink[] = [
  {
    title: 'Rules',
    href: HREFS.infoPage.rules,
  },
  {
    title: 'Privacy policy',
    href: HREFS.infoPage.privacyPolicy,
  },
  {
    title: 'About us',
    href: HREFS.infoPage.aboutUs,
  },
];

export const SITE_META = {
  generateOg: {
    page: `${process.env.APP_URL}/api/meta/og`,
    comic: `${process.env.APP_URL}/api/meta/comic-og`,
    profile: `${process.env.APP_URL}/api/meta/profile-og`,
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
    title: 'Uploads',
    href: '/uploads',
    icon: 'upload',
  },
];

export const SETTINGS_NAVIGATION: readonly NavigationLink[] = [
  {
    title: 'Appearance',
    href: HREFS.settings.origin,
  },
  {
    title: 'Account',
    href: HREFS.settings.account,
    isPrivate: true,
  },
];

export const AUTH_MENU_NAVIGATION: readonly NavigationLink[] = [
  {
    title: 'Folders',
    href: HREFS.library.folders,
    icon: 'folder',
  },
  {
    title: 'Bookmarks',
    href: HREFS.library.bookmarks,
    icon: 'bookmark',
  },
];

export const SORT_VARIANTS: ISortVariants = {
  comics: COMIC_SORT_VARIANTS,
  comicsWithChapters: COMIC_WITH_CHAPTERS_SORT_VARIANTS,
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
} as const;

export const LIMITS = {
  chapters: 5,
  comics: 6,
  comicsSearch: 5,
  folders: 20,
  comments: 5,
  bookmarks: 6,
  users: 12,
} as const;

export const PLACEHOLDERS = {
  folderTitle: ['reading..', 'completed..', 'in progress..', 'plan to read..'],
};
