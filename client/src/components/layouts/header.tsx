'use client';

import React, { FC, useEffect, useState } from 'react';

import { ComicSearch } from '@/components/comic-search';
import { MenuSwitcher } from '@/components/menu-switcher';
import { MobileMenuSwitcher } from '@/components/mobile-menu-switcher';
import { UserMenu } from '@/components/user-menu';
import { useMounted } from '@/hooks/use-mounted';
import { cn } from '@/lib/utils';
import { IUser } from '@/types/user.types';

type HeaderProps = {
  user: IUser | null;
};

export const Header: FC<HeaderProps> = ({ user }) => {
  const isMounted = useMounted();
  const [isScrolled, setIsScrolled] = useState(false);

  const checkScroll = () => {
    setIsScrolled(window.scrollY > 10);
  };

  useEffect(() => {
    if (isMounted) {
      checkScroll();

      window.addEventListener('scroll', checkScroll);
      return () => {
        window.removeEventListener('scroll', checkScroll);
      };
    }
  }, [isMounted]);

  return (
    <header
      className={cn(
        'sticky top-0 z-20 w-full py-2',
        isScrolled &&
          'border-b bg-background/95  backdrop-blur supports-backdrop-blur:bg-background/60'
      )}
    >
      <div className='container flex items-center justify-between gap-2'>
        <div>
          <MenuSwitcher />
          <MobileMenuSwitcher />
        </div>
        <div className='flex items-center justify-end gap-2'>
          <ComicSearch isScrolled={isScrolled} />
          <UserMenu user={user} />
        </div>
      </div>
    </header>
  );
};
