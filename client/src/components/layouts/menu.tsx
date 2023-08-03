'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { NavigationItem } from '@/types/configs.types';

export type MenuProps = {
  navigation: NavigationItem[];
};

const navItemStyles = 'flex items-center gap-1 font-semibold py-1 px-2';

export const Menu: FC<MenuProps> = ({ navigation }) => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className='flex flex-col gap-2'>
        {navigation.map((navItem, i) => {
          const Icon = Icons[navItem.title.toLocaleLowerCase()];
          return (
            <li key={'navItem' + i}>
              <h3>
                {navItem.href ? (
                  <Link
                    href={navItem.href}
                    className={cn(
                      navItemStyles,
                      'rounded',
                      pathname === navItem.href
                        ? 'bg-active text-active-foreground'
                        : 'hover:bg-background/30 focus:bg-background/30'
                    )}
                  >
                    <Icon />
                    {navItem.title}
                  </Link>
                ) : (
                  <span className={navItemStyles}>
                    <Icon />
                    {navItem.title}
                  </span>
                )}
              </h3>

              {navItem.links && (
                <ul className='flex flex-col'>
                  {navItem.links.map((navItemLink, i) => (
                    <li key={'navItemLink' + i}>
                      <Link
                        href={navItemLink.href}
                        className='flex items-center gap-1 rounded px-4 py-1 text-base hover:bg-background/30 focus:bg-background/30'
                      >
                        {navItemLink.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
