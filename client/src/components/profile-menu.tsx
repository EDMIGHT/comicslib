'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { buttonVariants } from '@/components/ui/button';
import { PROFILE_NAVIGATION } from '@/configs/site.configs';
import { cn } from '@/lib/utils';

import { Icons } from './icons';

export const ProfileMenu = () => {
  const pathname = usePathname();

  return (
    <nav className='rounded border-none bg-card p-1'>
      <ul className='flex w-full flex-col gap-1'>
        {PROFILE_NAVIGATION.map((navItem, i) => {
          const Icon = Icons[navItem.title.toLowerCase()];
          return (
            <li key={i + 'profile'} className=''>
              <h3>
                <Link
                  href={navItem.href}
                  className={cn(
                    'w-full text-base justify-start hover:no-underline flex gap-1 py-1 px-2 rounded font-semibold',
                    pathname.includes(navItem.href)
                      ? 'bg-active text-active-foreground'
                      : 'hover:bg-background/30 focus:bg-background/30'
                  )}
                >
                  <Icon /> {navItem.title}
                </Link>
              </h3>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
