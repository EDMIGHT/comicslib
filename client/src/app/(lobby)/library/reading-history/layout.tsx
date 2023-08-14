import { Metadata } from 'next';
import { FC, ReactNode } from 'react';

import { PageHeader } from '@/components/page-header';
import { createTitle } from '@/lib/helpers/general.helper';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className='flex flex-col gap-2'>
      <PageHeader title='Reading History' />
      {children}
    </div>
  );
};

export default Layout;
