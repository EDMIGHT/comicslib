'use client';

import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';

import { Menu } from '@/components/layouts/menu';
import { SidebarFooter } from '@/components/sidebar-footer';
import { Icons } from '@/components/ui/icons';
import { SITE_CONFIG } from '@/configs/site.configs';
import { useAppSelector } from '@/hooks/redux-hooks';
import { useActions } from '@/hooks/use-actions';
import { cn } from '@/lib/utils';
import { IUser } from '@/types/user.types';

type SidebarProps = HTMLAttributes<HTMLDivElement> & {
  user: IUser | null;
};

export const Sidebar: FC<SidebarProps> = ({ user, className, ...rest }) => {
  const { isActiveMenu } = useAppSelector((state) => state.settings);
  const { setIsActiveMenu } = useActions();

  return (
    <aside
      {...rest}
      className={cn(
        'hidden lg:sticky left-0 top-0 z-40 lg:flex h-screen w-[--menu-width] flex-shrink-0 flex-col bg-card p-3 transition-all',
        isActiveMenu ? 'm-0' : '-ml-[--menu-width] -left-[--menu-width]',
        className
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

      <Menu navigation={SITE_CONFIG.navigation} user={user} />
      <SidebarFooter socialLinks={SITE_CONFIG.socials} />
    </aside>
  );
};
