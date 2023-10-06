import { FC, ReactNode } from 'react';

import { PageHeader } from '@/components/page-header';
import { PageVerticalNav } from '@/components/page-vertical-nav';
import { SETTINGS_NAVIGATION } from '@/configs/navigation.configs';

type PageProps = {
  children: ReactNode;
};

const Page: FC<PageProps> = ({ children }) => {
  return (
    <div className='space-y-4'>
      <PageHeader>Settings</PageHeader>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-[auto_1fr]'>
        <PageVerticalNav items={SETTINGS_NAVIGATION} />
        {children}
      </div>
    </div>
  );
};

export default Page;
