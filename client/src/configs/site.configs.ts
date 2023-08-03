import { Icons } from '@/components/icons';
import { NavigationLink, SiteConfig, SocialLink } from '@/types/configs.types';

export const siteSocialLinks: SocialLink[] = [
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

export const titlesNavigation: NavigationLink[] = [
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

export const followsNavigation: NavigationLink[] = [
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

export const siteConfig: SiteConfig = {
  name: 'comicslib',
  logo: Icons.logo,
  navigation: [
    {
      title: 'Home',
      href: '/',
      // icon: Icons.home,
    },
    {
      title: 'Follows',
      // icon: Icons.follows,
      links: followsNavigation,
    },
    {
      title: 'Titles',
      // icon: Icons.titles,
      links: titlesNavigation,
    },
  ],
  socials: siteSocialLinks,
};
