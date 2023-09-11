'use client';

import { UserCircle2 } from 'lucide-react';
import Link from 'next/link';
import { FC, useState } from 'react';

import { Avatar } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HREFS } from '@/configs/href.configs';
import { AUTH_MENU_NAVIGATION } from '@/configs/site.configs';
import { cn } from '@/lib/utils';
import { IUser } from '@/types/user.types';

import { ThemeSwitcher } from './theme-switcher';
import { UserAvatar } from './user-avatar';

type UserMenuProps = {
  user: IUser | null;
};

export const UserMenu: FC<UserMenuProps> = ({ user }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Avatar className='hover:cursor-pointer'>
          {user ? (
            <UserAvatar img={user.img} login={user.login} />
          ) : (
            <UserCircle2 className='h-full w-full stroke-1' />
          )}
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className={cn('w-fit min-w-[200px] space-y-2 px-4 py-3')}>
        <div className='flex flex-col items-center justify-center gap-1'>
          {user ? (
            <UserAvatar img={user.img} login={user.login} className='h-12 w-12' />
          ) : (
            <UserCircle2 className='h-12 w-12 stroke-1' />
          )}
          <h3 className='text-lg font-semibold'>{user ? user.login : 'Guest'}</h3>
        </div>
        <div className='flex flex-col border-t p-1'>
          {user ? (
            <ul className='flex flex-col gap-1'>
              <li>
                <Link
                  href={`${HREFS.profile}/${user.login}`}
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'flex justify-start gap-1 hover:bg-muted'
                  )}
                  onClick={() => setOpen(false)}
                >
                  <Icons.user /> Profile
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
                        'flex justify-start gap-1 hover:bg-muted'
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {Icon && <Icon />}
                      {nav.title}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  href={`${HREFS.profile}/settings`}
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'flex justify-start gap-1 hover:bg-muted'
                  )}
                  onClick={() => setOpen(false)}
                >
                  <Icons.settings /> Settings
                </Link>
              </li>
              {user && (
                <li>
                  <Link
                    href={`${HREFS.profile}/${user.login}`}
                    className={cn(
                      buttonVariants({ variant: 'ghost' }),
                      'flex justify-start gap-1 hover:bg-muted'
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <Icons.logOut /> Sign Out
                  </Link>
                </li>
              )}
            </ul>
          ) : (
            <ul className='flex w-full flex-col space-y-1'>
              <li>
                <Link
                  href={HREFS.auth.signIn}
                  className={cn(buttonVariants({ variant: 'ghost' }), 'w-full')}
                  onClick={() => setOpen(false)}
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href={HREFS.auth.signUp}
                  className={cn(buttonVariants({ variant: 'ghost' }), 'w-full')}
                  onClick={() => setOpen(false)}
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* <li>
            <ThemeSwitcher className='text-sm font-medium' />
          </li> */}
      </PopoverContent>
    </Popover>
  );
};
