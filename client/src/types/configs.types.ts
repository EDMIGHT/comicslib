import { LucideProps } from 'lucide-react';

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
};

export type NavigationItem = {
  title: string;
  href?: string;
  isPrivate?: boolean;
  icon: keyof typeof Icons;
  links?: NavigationLink[];
};

export type SiteConfig = {
  name: string;
  desc: string;
  logo: keyof typeof Icons;
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
  comics: ISortVariant[];
  users: ISortVariant[];
};
