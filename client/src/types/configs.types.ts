import { Icons } from '@/components/ui/icons';

export type SocialLink = {
  title: string;
  icon: keyof typeof Icons;
  href: string;
};

export type NavigationLink = {
  title: string;
  href: string;
  icon?: keyof typeof Icons;
  isPrivate?: boolean;
};

export type NavigationItemAction = {
  icon: keyof typeof Icons;
  href: string;
  isPrivate?: boolean;
};

export type NavigationItem = {
  title: string;
  href?: string;
  isPrivate?: boolean;
  action?: NavigationItemAction;
  icon: keyof typeof Icons;
  links?: NavigationLink[];
};

export type SiteConfig = {
  name: string;
  desc: string;
  logo: keyof typeof Icons;
  url: string;
  keywords: string[];
  navigation: readonly NavigationItem[];
  socials: readonly SocialLink[];
};

export type ISortVariant = {
  label: string;
  field: string;
  order: 'asc' | 'desc';
};

export type IConfigVariant = {
  title: string;
  field: string;
};

export type ISortVariants = {
  comics: readonly ISortVariant[];
  comicsWithChapters: readonly ISortVariant[];
  users: readonly ISortVariant[];
};
