'use client';

import React, { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type PropType = HTMLAttributes<HTMLUListElement> & {
  scrollSnaps: number[];
  selectedIndex: number;
  scrollTo: (index: number) => void | undefined;
};

export const CarouselDotButtons: React.FC<PropType> = ({
  scrollSnaps,
  selectedIndex,
  scrollTo,
  className,
  ...rest
}) => {
  return (
    <ul {...rest} className={cn('flex h-4 items-center justify-center gap-1', className)}>
      {scrollSnaps.map((_, i) => {
        const distance = Math.abs(selectedIndex - i);

        return (
          <li key={i} className='flex items-center'>
            <button
              type='button'
              onClick={() => scrollTo(i)}
              className={cn(
                'rounded-full transition-all',
                i === selectedIndex ? 'bg-active h-4 w-4' : 'bg-card h-3 w-3',
                distance === 1 && 'h-3 w-3',
                distance === 2 && 'h-2 w-2',
                distance === 3 && 'h-1 w-1',
                distance > 3 && 'hidden'
              )}
            />
          </li>
        );
      })}
    </ul>
  );
};
