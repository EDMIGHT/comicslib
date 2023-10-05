import { FC, ReactNode } from 'react';

import { Icons } from '@/components/ui/icons';
import { SITE_CONFIG } from '@/configs/site.configs';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className='flex h-screen flex-col-reverse items-center justify-center md:flex-row md:items-stretch md:justify-normal'>
      <section className=' flex items-center justify-center md:w-2/3'>{children}</section>
      <div className='flex items-center md:border-l'>
        <div className='flex items-center gap-1 bg-background py-6 text-2xl font-semibold md:-translate-x-1/4'>
          <Icons.logo /> <h2>{SITE_CONFIG.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default Layout;
