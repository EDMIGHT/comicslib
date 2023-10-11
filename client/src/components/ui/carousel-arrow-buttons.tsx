'use client';

import React, { PropsWithChildren } from 'react';

import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

type PropType = PropsWithChildren<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>;

export const CarouselPrevButton: React.FC<PropType> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <button
      type='button'
      {...restProps}
      className={cn(
        'flex min-h-[2.5rem] min-w-[2.5rem] cursor-pointer items-center justify-center rounded-full enabled:cursor-pointer enabled:hover:bg-black/40 disabled:text-muted transition-colors',
        className
      )}
    >
      <Icons.back />
      {children}
    </button>
  );
};

export const CarouselNextButton: React.FC<PropType> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <button
      type='button'
      {...restProps}
      className={cn(
        'flex min-h-[2.5rem] min-w-[2.5rem] cursor-pointer items-center justify-center rounded-full enabled:cursor-pointer enabled:hover:bg-black/40 disabled:text-muted transition-colors',
        className
      )}
    >
      <Icons.next />
      {children}
    </button>
  );
};
