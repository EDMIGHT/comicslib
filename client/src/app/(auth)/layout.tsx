import { FC, ReactNode } from 'react';

import { Icons } from '@/components/ui/icons';
import { SITE_CONFIG } from '@/configs/site.configs';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className='flex h-screen'>
      <section className='flex w-2/3 items-center justify-center'>{children}</section>
      <div className='flex items-center border-l'>
        <div className='flex -translate-x-1/4 items-center gap-1 bg-background py-6 text-2xl font-semibold'>
          <Icons.logo /> <h2>{SITE_CONFIG.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default Layout;
