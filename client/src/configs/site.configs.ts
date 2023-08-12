import { Icons } from '@/components/ui/icons';
import { ISortVariants, NavigationLink, SiteConfig, SocialLink } from '@/types/configs.types';

export const SITE_SOCIAL_LINKS: SocialLink[] = [
  {
    title: 'github',
    icon: Icons.github,
    href: 'https://github.com/EDMIGHT/comicslib',
  },
  {
    title: 'discord',
    icon: Icons.discord,
    href: 'https://discord.com/',
  },
  {
    title: 'twitter',
    icon: Icons.twitter,
    href: 'https://twitter.com/home',
  },
];

export const TITLES_NAVIGATION: NavigationLink[] = [
  {
    title: 'advanced search',
    href: '/titles',
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

export const FOLLOWS_NAVIGATION: NavigationLink[] = [
  {
    title: 'updates',
    href: '/library/updates',
  },
  {
    title: 'folders',
    href: '/folders',
  },
  {
    title: 'reading history',
    href: '/library/history',
  },
];

export const SITE_CONFIG: SiteConfig = {
  name: 'comicslib',
  logo: Icons.logo,
  navigation: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Library',
      links: FOLLOWS_NAVIGATION,
      isPrivate: true,
    },
    {
      title: 'Titles',
      links: TITLES_NAVIGATION,
    },
  ],
  socials: SITE_SOCIAL_LINKS,
};

export const PROFILE_NAVIGATION: NavigationLink[] = [
  {
    title: 'Rated',
    href: '',
    icon: 'star',
  },
  {
    title: 'Reading history',
    href: '/reading-history',
    icon: 'history',
  },
  {
    title: 'Uploads',
    href: '/uploads',
    icon: 'upload',
  },
];

export const AUTH_MENU_NAVIGATION: NavigationLink[] = [
  {
    title: 'My folders',
    href: '/folders',
    icon: 'folder',
  },
  {
    title: 'My reading history',
    href: '/library/reading-history',
    icon: 'history',
  },
];

export const SORT_VARIANTS: ISortVariants = {
  comics: [
    {
      label: 'recently added',
      field: 'createdAt',
      order: 'asc',
    },
    {
      label: 'oldest added',
      field: 'createdAt',
      order: 'desc',
    },
    {
      label: 'recently updated',
      field: 'updatedAt',
      order: 'asc',
    },
    {
      label: 'oldest updated',
      field: 'updatedAt',
      order: 'desc',
    },
    {
      label: 'title ascending',
      field: 'title',
      order: 'asc',
    },
    {
      label: 'title descending',
      field: 'title',
      order: 'desc',
    },
    // {
    //   label: 'highest rating',
    //   field: 'avgRating',
    //   order: 'asc',
    // },
  ],
};

export const PAGINATION_LIMIT_CONFIG = {
  chapters: 1,
  comics: 5,
  comments: 5,
};

export const COMIC_RATING_CONFIG = {
  min: 1,
  max: 10,
};
