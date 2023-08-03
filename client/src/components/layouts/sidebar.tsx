import Link from 'next/link';

import { siteConfig } from '@/configs/site.configs';

import { SidebarFooter } from '../sidebar-footer';
import { Menu } from './menu';

export const Sidebar = () => {
  return (
    <div className='sticky left-0 top-0 z-10 flex h-screen min-w-[256px] flex-col bg-card p-3'>
      <h2>
        <Link
          href='/'
          className='flex items-center gap-1 py-3 text-xl font-bold hover:opacity-80'
        >
          {siteConfig.name}
          {<siteConfig.logo />}
        </Link>
      </h2>
      <Menu navigation={siteConfig.navigation} />
      <SidebarFooter socialLinks={siteConfig.socials} />
    </div>
  );
};
