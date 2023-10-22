import { Metadata } from 'next';
import { FC, ReactNode } from 'react';

import { TITLES_PAGE_META } from '@/configs/meta.configs';

type LayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: TITLES_PAGE_META.random.title,
  description: TITLES_PAGE_META.random.desc,
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default Layout;
