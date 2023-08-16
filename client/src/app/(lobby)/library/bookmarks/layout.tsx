import { FC, ReactNode } from 'react';

import { PageHeader } from '@/components/page-header';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return <div className='flex flex-col gap-2'>{children}</div>;
};

export default Layout;
