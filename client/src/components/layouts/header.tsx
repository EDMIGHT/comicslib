import React, { FC } from 'react';

import { ComicSearch } from '@/components/comic-search';
import { MenuSwitcher } from '@/components/menu-switcher';
import { MobileMenuSwitcher } from '@/components/mobile-menu-switcher';
import { UserMenu } from '@/components/user-menu';
import { IUser } from '@/types/user.types';

type HeaderProps = {
  user: IUser | null;
};

export const Header: FC<HeaderProps> = ({ user }) => {
  return (
    <header className='supports-backdrop-blur:bg-background/60 sticky top-0 z-20 w-full border-b bg-background/95 p-2 backdrop-blur'>
      <div className='container flex items-center justify-between gap-2'>
        <div>
          <MenuSwitcher />
          <MobileMenuSwitcher />
        </div>
        <div className='flex items-center justify-end gap-2'>
          <ComicSearch />
          <UserMenu user={user} />
        </div>
      </div>
    </header>
  );
};
