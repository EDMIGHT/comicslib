import { LucideProps } from 'lucide-react';

export type SocialLink = {
  title: string;
  icon: string;
  href: string;
};

export type NavigationLink = {
  title: string;
  href: string;
  icon?: string;
};

export type NavigationItem = {
  title: string;
  href?: string;
  isPrivate?: boolean;
  icon: string;
  links?: NavigationLink[];
};

export type SiteConfig = {
  name: string;
  logo: string;
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
