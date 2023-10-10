import { NavigationItem, NavigationLink } from '@/types/configs.types';

import { HREFS } from './href.configs';

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

export const NAVIGATION: readonly NavigationItem[] = [
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
    action: {
      icon: 'add',
      href: HREFS.create.title,
      isPrivate: true,
    },
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
];
