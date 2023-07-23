'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

export const ThemeSwitcher = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onClickSwitcher = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button onClick={onClickSwitcher} variant='outline' className='p-2'>
      {theme === 'dark' ? (
        <SunIcon className='h-[1.2rem] w-[1.2rem] text-foreground' />
      ) : (
        <MoonIcon className='h-[1.2rem] w-[1.2rem] text-foreground' />
      )}
    </Button>
  );
};
