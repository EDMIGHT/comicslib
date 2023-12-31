'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { SETTINGS_NAVIGATION } from '@/configs/navigation.configs';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';

type PageVerticalNavProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  items: typeof SETTINGS_NAVIGATION;
};

export const PageVerticalNav: FC<PageVerticalNavProps> = ({ items, className, ...rest }) => {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <nav
      className={cn('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1', className)}
      {...rest}
    >
      {items.map((item, i) => {
        const Icon = item.icon && Icons[item.icon];

        if (item.isPrivate && !user) {
          return null;
        }

        return (
          <Link
            key={i}
            href={item.href}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              pathname === item.href
                ? 'bg-muted hover:bg-muted'
                : 'hover:bg-transparent hover:underline',
              'justify-start'
            )}
          >
            {Icon ? <Icon /> : null} {item.title}
          </Link>
        );
      })}
    </nav>
  );
};
