'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC, useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ISortVariant } from '@/types/configs.types';

type SortProps = {
  variants: ISortVariant[];
  initialSort?: string;
  initialOrder?: string;
};

export const Sort: FC<SortProps> = ({ variants, initialOrder, initialSort }) => {
  const initialVariant = variants.find(
    (v) => v.field === initialSort && v.order === initialOrder
  );
  const [variant, setVariant] = useState(initialVariant ?? variants[0]);
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (field: string, order: string) => {
      // @ts-ignore
      const params = new URLSearchParams(searchParams);
      params.set('sort', field);
      params.set('order', order);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className='w-[180px] justify-between gap-1 bg-secondary'
          variant='outline'
          role='combobox'
          aria-expanded={open}
        >
          {variant.label ?? 'sort'} <Icons.chevronUpDown className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[180px] bg-secondary p-0'>
        <ul>
          {variants.map((variant, i) => (
            <li
              key={i}
              className={cn(
                'cursor-pointer hover:bg-background/80 p-2 pl-4 rounded text-sm font-medium'
              )}
              onClick={() => {
                setVariant(variant);
                setOpen(false);
                router.push(
                  pathname.includes('?')
                    ? '&'
                    : '?' + createQueryString(variant.field, variant.order)
                );
              }}
            >
              {variant.label}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
