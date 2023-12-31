import {
  COMIC_SORT_VARIANTS,
  COMIC_WITH_CHAPTERS_SORT_VARIANTS,
} from '@/configs/comic.configs';
import { LOCAL_ENDPOINTS } from '@/configs/endpoint.configs';
import { HREFS } from '@/configs/href.configs';
import { NAVIGATION } from '@/configs/navigation.configs';
import { SiteConfig, SocialLink } from '@/types/configs.types';

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
  comic: `${process.env.APP_URL}${LOCAL_ENDPOINTS.meta.comic}`,
  profile: `${process.env.APP_URL}${LOCAL_ENDPOINTS.meta.profile}`,
};

export const SITE_CONFIG: SiteConfig = {
  name: 'comicslib',
  desc: 'A pet project inspired by MangaDex, the purpose of which is to teach how to use NextJS 13.4',
  logo: 'logo',
  keywords: [
    'NextJS',
    'Next.JS 13.4',
    'NextJS 13.4',
    'React',
    'Tailwind CSS',
    'Server Components',
    'comicslib',
    'comics',
  ],
  url: process.env.APP_URL!,
  navigation: NAVIGATION,
  socials: SITE_SOCIAL_LINKS,
};

export const SORT_VARIANTS = {
  comics: COMIC_SORT_VARIANTS,
  comicsWithChapters: COMIC_WITH_CHAPTERS_SORT_VARIANTS,
  users: [
    {
      label: 'Date Registration: New to old',
      field: 'createdAt',
      order: 'desc',
    },
    {
      label: 'Date Registration: Old to new',
      field: 'createdAt',
      order: 'asc',
    },

    {
      label: 'Username: A to Z',
      field: 'login',
      order: 'asc',
    },
    {
      label: 'Username: Z to A',
      field: 'login',
      order: 'desc',
    },
  ],
  comments: [
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
      label: 'Popular: Best to worse',
      field: 'votes',
      order: 'desc',
    },
    {
      label: 'Popular: Worse to best',
      field: 'votes',
      order: 'asc',
    },
  ],
  chapters: [
    {
      label: 'Number: Most to least',
      field: 'number',
      order: 'desc',
    },
    {
      label: 'Number: Least to most',
      field: 'number',
      order: 'asc',
    },
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
  userLogin: ['alex123', 'test213', 'latyshev_oleksii', '1233321'],
};
