import { Icons } from '@/components/icons';
import { NavigationLink, SiteConfig, SocialLink } from '@/types/configs.types';

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
    href: '/search',
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
    title: 'library',
    href: '/library',
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
      title: 'Follows',
      links: FOLLOWS_NAVIGATION,
    },
    {
      title: 'Titles',
      links: TITLES_NAVIGATION,
    },
  ],
  socials: SITE_SOCIAL_LINKS,
};

export const PAGINATION_LIMIT_CONFIG = {
  chapters: 1,
  comics: 5,
  comments: 5,
};
