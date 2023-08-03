import { LucideProps } from 'lucide-react';

export type SocialLink = {
  title: string;
  icon: (props: LucideProps) => JSX.Element;
  href: string;
};

export type NavigationLink = {
  title: string;
  href: string;
};

export type NavigationItem = {
  title: string;
  href?: string;
  // icon: (props: LucideProps) => JSX.Element;
  links?: NavigationLink[];
};

export type SiteConfig = {
  name: string;
  logo: (props: LucideProps) => JSX.Element;
  navigation: NavigationItem[];
  socials: SocialLink[];
};
