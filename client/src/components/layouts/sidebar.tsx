'use client';

import Link from 'next/link';

import { Icons } from '@/components/icons';
import { SidebarFooter } from '@/components/sidebar-footer';
import { SITE_CONFIG } from '@/configs/site.configs';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useActions } from '@/hooks/use-actions';
import { cn } from '@/lib/utils';

import { Menu } from './menu';

export const Sidebar = () => {
  const { isActiveMenu } = useAppSelector((state) => state.settings);
  const { setIsActiveMenu } = useActions();

  return (
    <aside
      className={cn(
        'sticky left-0 top-0 z-10 flex h-screen w-[--menu-width] flex-col bg-card p-3 transition-all',
        isActiveMenu ? 'm-0' : '-ml-[--menu-width] -left-[--menu-width]'
      )}
    >
      <div className='flex items-center justify-between'>
        <h2>
          <Link
            href='/'
            className='flex items-center gap-1 py-3 text-xl font-bold hover:opacity-80'
          >
            {SITE_CONFIG.name}
            <Icons.logo />
          </Link>
        </h2>
        <button onClick={() => setIsActiveMenu(!isActiveMenu)}>
          <Icons.close className='h-7 w-7 hover:opacity-80 focus:opacity-80' />
        </button>
      </div>

      <Menu navigation={SITE_CONFIG.navigation} />
      <SidebarFooter socialLinks={SITE_CONFIG.socials} />
    </aside>
  );
};
