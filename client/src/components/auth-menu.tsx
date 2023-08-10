'use client';

import { UserCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';

import { Avatar } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AUTH_MENU_NAVIGATION } from '@/configs/site.configs';
import { cn } from '@/lib/utils';
import { IUser } from '@/types/user.types';

import { ThemeSwitcher } from './theme-switcher';
import { UserAvatar } from './user-avatar';

type AuthMenuProps = {
  user: IUser | null;
};

export const AuthMenu: FC<AuthMenuProps> = ({ user }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Avatar className='hover:cursor-pointer'>
          {user ? (
            <UserAvatar user={user} />
          ) : (
            <UserCircle2 className='h-full w-full stroke-1' />
          )}
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className={cn('w-fit min-w-[150px] space-y-2 p-5')}>
        <div className='flex flex-col items-center justify-center gap-1'>
          {user ? (
            <div className='relative h-12 w-12 overflow-hidden rounded-full'>
              <Image src={user.img} alt={user.login} fill />
            </div>
          ) : (
            <UserCircle2 className='h-12 w-12 stroke-1' />
          )}
          <h3 className='text-lg font-semibold'>{user ? user.login : 'Guest'}</h3>
        </div>
        <div className='flex flex-col items-center border-y p-1 '>
          {user ? (
            <ul className='space-y-1'>
              <li>
                <Link
                  href={`profile/${user.login}`}
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'flex justify-start gap-1 hover:opacity-80'
                  )}
                  onClick={() => setOpen(false)}
                >
                  <Icons.user /> My Profile
                </Link>
              </li>
              {AUTH_MENU_NAVIGATION.map((nav, i) => {
                const Icon = nav.icon && Icons[nav.icon];
                return (
                  <li key={`profile-nav` + i}>
                    <Link
                      href={nav.href}
                      className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        'flex justify-start gap-1 hover:opacity-80'
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {Icon && <Icon />}
                      {nav.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul className='flex w-full flex-col space-y-1'>
              <li>
                <Link
                  href='/sign-in'
                  className={cn(buttonVariants({ variant: 'ghost' }), 'w-full')}
                  onClick={() => setOpen(false)}
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href='/sign-in'
                  className={cn(buttonVariants({ variant: 'ghost' }), 'w-full')}
                  onClick={() => setOpen(false)}
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div className='flex flex-col items-center p-1 '>
          <ul className='space-y-1'>
            <li>
              <ThemeSwitcher className='text-sm font-medium' />
            </li>
            {user ? (
              <li>
                <Button
                  variant='ghost'
                  className='w-full justify-start border-none p-1'
                  onClick={() => setOpen(false)}
                >
                  <Icons.logOut className='mr-1' /> Sign Out
                </Button>
              </li>
            ) : null}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
};
