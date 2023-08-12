import { LucideProps } from 'lucide-react';

export type SocialLink = {
  title: string;
  icon: (props: LucideProps) => JSX.Element;
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
  // icon: (props: LucideProps) => JSX.Element;
  links?: NavigationLink[];
};

export type SiteConfig = {
  name: string;
  logo: (props: LucideProps) => JSX.Element;
  navigation: NavigationItem[];
  socials: SocialLink[];
};

export type ISortVariant = {
  label: string;
  field: string;
  order: 'asc' | 'desc';
};

export type ISortVariants = {
  comics: ISortVariant[];
};
