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

type MobileSidebarProps = HTMLAttributes<HTMLDivElement> & {
  user: IUser | null;
};

export const MobileSidebar: FC<MobileSidebarProps> = ({ user, className, ...rest }) => {
  const { isActiveMobileMenu } = useAppSelector((state) => state.settings);
  const { setIsActiveMobileMenu } = useActions();

  const onClickMenuItem = () => {
    setIsActiveMobileMenu(false);
  };

  return (
    <>
      {isActiveMobileMenu && (
        <div
          onClick={() => setIsActiveMobileMenu(false)}
          className='fixed inset-0 z-30 flex h-screen w-screen  items-center justify-center bg-background/20 backdrop-blur-sm transition-all lg:hidden'
        />
      )}
      <aside
        {...rest}
        className={cn(
          'absolute lg:hidden left-0 top-0 z-40 flex h-screen flex-shrink-0 w-[--menu-width] flex-col bg-card p-3 transition-all',
          isActiveMobileMenu ? 'm-0' : '-ml-[--menu-width] -left-[--menu-width]',
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
          <button onClick={() => setIsActiveMobileMenu(!isActiveMobileMenu)}>
            <Icons.close className='h-7 w-7 hover:opacity-80 focus:opacity-80' />
          </button>
        </div>

        <Menu
          navigation={SITE_CONFIG.navigation}
          user={user}
          onClickMenuItem={onClickMenuItem}
        />
        <SidebarFooter socialLinks={SITE_CONFIG.socials} />
      </aside>
    </>
  );
};
