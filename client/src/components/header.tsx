import axios from 'axios';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';

import { AuthMenu } from './auth-menu';
import { ThemeSwitcher } from './theme-switcher';

export const Header = () => {
  return (
    <header className='supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 p-2 backdrop-blur'>
      <nav className='container flex justify-between gap-2'>
        <Link href='/' className='text-2xl hover:opacity-80'>
          comicslib
        </Link>
        <div className='flex gap-2'>
          <ThemeSwitcher />
          <Button variant='outline' className='w-40 items-center justify-start gap-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-5 w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
              />
            </svg>
            search
          </Button>
          <AuthMenu />
        </div>
      </nav>
    </header>
  );
};
