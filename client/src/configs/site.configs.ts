import {
  COMIC_SORT_VARIANTS,
  COMIC_WITH_CHAPTERS_SORT_VARIANTS,
} from '@/configs/comic.configs';
import { NAVIGATION } from '@/configs/navigation.configs';
import { ISortVariants, SiteConfig, SocialLink } from '@/types/configs.types';

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

export const OPENGRAPHS_URLS = {
  page: `${process.env.APP_URL}/api/meta/og`,
  comic: `${process.env.APP_URL}/api/meta/comic-og`,
  profile: `${process.env.APP_URL}/api/meta/profile-og`,
};

export const SITE_CONFIG: SiteConfig = {
  name: 'comicslib',
  desc: 'web application whose purpose is to provide comics viewing services',
  logo: 'logo',
  navigation: NAVIGATION,
  socials: SITE_SOCIAL_LINKS,
};

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
  pagePerChapter: 30,
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
