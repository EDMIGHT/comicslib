'use client';

import { useTheme } from 'next-themes';
import { FC } from 'react';

import { ThemeView } from '@/components/theme-view';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SITE_THEMES } from '@/configs/site.configs';
import { useMounted } from '@/hooks/use-mounted';
import { cn } from '@/lib/utils';

type ThemeSwitcherThemeSwitcherProps = {
  className?: string;
};

export const ThemeSwitcher: FC<ThemeSwitcherThemeSwitcherProps> = ({ className }) => {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();

  if (!mounted) {
    return null;
  }

  return (
    <RadioGroup
      defaultValue={theme}
      onValueChange={(val) => setTheme(val)}
      className={cn('flex flex-wrap items-center gap-2 p-1', className)}
    >
      <label className='cursor-pointer'>
        <RadioGroupItem value='system' className='sr-only' />
        <ThemeView value='system' currentTheme={theme} />
        <span className='block w-full p-2 text-center font-normal capitalize'>System</span>
      </label>
      {SITE_THEMES.map((renderTheme) => (
        <label key={renderTheme} className='cursor-pointer'>
          <RadioGroupItem value={renderTheme} className='sr-only' />
          <ThemeView value={renderTheme} currentTheme={theme} />
          <span className='block w-full p-2 text-center font-medium capitalize'>
            {renderTheme}
          </span>
        </label>
      ))}
    </RadioGroup>
  );
};
