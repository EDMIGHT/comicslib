import { Metadata } from 'next';
import { FC, ReactNode } from 'react';

import { PageHeader } from '@/components/page-header';
import { PageVerticalNav } from '@/components/page-vertical-nav';
import { SETTINGS_PAGE_META } from '@/configs/meta.configs';
import { SETTINGS_NAVIGATION } from '@/configs/navigation.configs';

type PageProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: SETTINGS_PAGE_META.title,
  description: SETTINGS_PAGE_META.desc,
};

const Page: FC<PageProps> = ({ children }) => {
  return (
    <div className='space-y-4'>
      <PageHeader>Settings</PageHeader>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-[auto_1fr]'>
        <PageVerticalNav items={SETTINGS_NAVIGATION} />
        {children}
      </div>
    </div>
  );
};

export default Page;
