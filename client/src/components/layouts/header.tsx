import Link from 'next/link';
import React from 'react';

import { AuthMenu } from '@/components/auth-menu';
import { Icons } from '@/components/icons';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Button } from '@/components/ui/button';

export const Header = () => {
  return (
    <header className='supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 p-2 backdrop-blur'>
      <nav className='container flex justify-between gap-2'>
        <Link href='/' className='flex items-center gap-1 text-2xl hover:opacity-80'>
          comicslib
          <Icons.logo />
        </Link>
        <div className='flex gap-2'>
          <ThemeSwitcher />
          <Button variant='outline' className='w-40 items-center justify-start gap-1'>
            <Icons.search />
            search
          </Button>
          <AuthMenu />
        </div>
      </nav>
    </header>
  );
};
