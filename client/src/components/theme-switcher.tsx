'use client';

import { useTheme } from 'next-themes';
import { FC, HTMLAttributes, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SITE_THEMES } from '@/configs/site.configs';
import { cn } from '@/lib/utils';

type ThemeSwitcherProps = HTMLAttributes<HTMLDivElement>;

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className, ...rest }) => {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div {...rest} className={cn('flex items-center gap-2 p-1', className)}>
      <h3>Theme:</h3>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className={cn('flex w-[100px] p-1 text-sm font-medium')}
          >
            <span>{theme}</span>
            <Icons.chevronUpDown className='h-4 w-4' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-fit p-1'>
          <ul>
            {SITE_THEMES.map((theme, i) => (
              <li key={i}>
                <Button
                  variant='outline'
                  className='w-full border-none px-4 py-3 text-sm font-medium'
                  onClick={() => {
                    setTheme(theme);
                    setOpen(false);
                  }}
                >
                  {theme}
                </Button>
              </li>
            ))}
            <li>
              <Button
                variant='outline'
                className='w-full border-none px-4 py-3 text-sm font-medium'
                onClick={() => {
                  setTheme('system');
                  setOpen(false);
                }}
              >
                system
              </Button>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};
