'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { FC } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type NavigationVariants = {
  id?: string;
  href: string;
  searchParams: string;
  title: string;
};

type NavigationBtnsProps = {
  variants: NavigationVariants[];
  isFirstActive?: boolean;
};

export const NavigationBtns: FC<NavigationBtnsProps> = ({ variants, isFirstActive }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <Card className='flex w-fit gap-2 border-none p-1'>
      {variants.map((v, i) => {
        const hrefSearchParams = v.searchParams ? `?${v.searchParams}` : '';
        return (
          <Link
            key={v.id ?? i}
            href={v.href + hrefSearchParams}
            className={cn(
              buttonVariants({ variant: 'link' }),
              ((isFirstActive && i === 0) ||
                (pathname === v.href && searchParams.toString().includes(v.searchParams))) &&
                'bg-active text-active-foreground'
            )}
          >
            {v.title}
          </Link>
        );
      })}
    </Card>
  );
};
