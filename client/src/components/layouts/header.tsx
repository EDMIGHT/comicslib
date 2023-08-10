import React from 'react';

import { AuthMenu } from '@/components/auth-menu';
import { Icons } from '@/components/ui/icons';
import { MenuSwitcher } from '@/components/menu-switcher';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Button } from '@/components/ui/button';

export const Header = () => {
  return (
    <header className='supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 p-2 backdrop-blur'>
      <div className='container flex items-center justify-between gap-2'>
        <div>
          <MenuSwitcher />
        </div>
        <div className='flex items-center justify-end gap-2'>
          <ThemeSwitcher />
          <Button variant='outline' className='w-52 items-center justify-start gap-1'>
            <Icons.search />
            search
          </Button>
          <AuthMenu />
        </div>
      </div>
    </header>
  );
};
