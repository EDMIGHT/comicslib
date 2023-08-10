'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

import { Icons } from '@/components/ui/icons';
import { PROFILE_NAVIGATION } from '@/configs/site.configs';
import { cn } from '@/lib/utils';

type IProfileMenuProps = {
  login: string;
};

export const ProfileMenu: FC<IProfileMenuProps> = ({ login }) => {
  const pathname = usePathname();

  return (
    <ul className='flex w-full flex-col gap-1'>
      {PROFILE_NAVIGATION.map((navItem, i) => {
        const Icon = Icons[navItem.icon ?? ''];
        return (
          <li key={i + 'profile'} className=''>
            <h3>
              <Link
                href={`/profile/${login}${navItem.href}`}
                className={cn(
                  'w-full text-base justify-start hover:no-underline flex gap-1 py-1 px-2 rounded font-semibold',
                  pathname === `/profile/${login}${navItem.href}`
                    ? 'bg-active text-active-foreground'
                    : 'hover:bg-background/30 focus:bg-background/30'
                )}
              >
                {Icon ? <Icon /> : null} {navItem.title}
              </Link>
            </h3>
          </li>
        );
      })}
    </ul>
  );
};
