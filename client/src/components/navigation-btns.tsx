'use client';

import Link from 'next/link';
import { FC } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type NavigationVariants = {
  id?: string;
  href: string;
  title: string;
};

type NavigationBtnsProps = {
  variants: NavigationVariants[];
  currentActive: string;
};

// TODO попробовать сделать более универсальным

export const NavigationBtns: FC<NavigationBtnsProps> = ({ variants, currentActive }) => {
  return (
    <Card className='flex w-fit gap-2 border-none p-1'>
      {variants.map((v, i) => {
        return (
          <Link
            key={v.id ?? i}
            href={v.href}
            className={cn(
              buttonVariants({ variant: 'link' }),
              v.href === currentActive && 'bg-active text-active-foreground'
            )}
          >
            {v.title}
          </Link>
        );
      })}
    </Card>
  );
};
