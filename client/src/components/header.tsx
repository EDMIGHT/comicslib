import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';

import { ThemeSwitcher } from './theme-switcher';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export const Header = () => {
  return (
    <header className='supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 p-2 backdrop-blur'>
      <nav className='container flex justify-between gap-2'>
        <Link href='/' className='text-2xl hover:opacity-80'>
          comicslib
        </Link>
        <div className='flex gap-2'>
          <ThemeSwitcher />
          <Button variant='outline'>search</Button>
          <Avatar>
            <AvatarImage
              src='https://i.pinimg.com/564x/9b/3f/e2/9b3fe2b12cdd77e50f94aac698e4318a.jpg'
              alt='your avatar'
            />
            <AvatarFallback>YOU</AvatarFallback>
          </Avatar>
        </div>
      </nav>
    </header>
  );
};
