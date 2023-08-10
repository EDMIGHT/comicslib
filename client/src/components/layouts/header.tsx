import React, { FC } from 'react';

import { AuthMenu } from '@/components/auth-menu';
import { MenuSwitcher } from '@/components/menu-switcher';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { IUser } from '@/types/user.types';

type HeaderProps = {
  user: IUser | null;
};

export const Header: FC<HeaderProps> = ({ user }) => {
  return (
    <header className='supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 p-2 backdrop-blur'>
      <div className='container flex items-center justify-between gap-2'>
        <div>
          <MenuSwitcher />
        </div>
        <div className='flex items-center justify-end gap-2'>
          <Button variant='outline' className='w-52 items-center justify-start gap-1'>
            <Icons.search />
            search
          </Button>
          <AuthMenu user={user} />
        </div>
      </div>
    </header>
  );
};
