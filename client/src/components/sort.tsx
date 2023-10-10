'use client';

import { useSearchParams } from 'next/navigation';
import { FC, useCallback, useState } from 'react';

import { Button, ButtonProps } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useChangeSearchParams } from '@/hooks/use-change-search-params';
import { cn } from '@/lib/utils';
import { ISortVariant } from '@/types/configs.types';

type SortProps = {
  defaultVariantNumber?: number;
  variants: readonly ISortVariant[];
  initialSort?: string | null;
  initialOrder?: string | null;
  contentWidth?: string;
  styleVariant?: 'default' | 'transparent';
  customHandler?: (variant: ISortVariant) => void;
} & ButtonProps;

export const Sort: FC<SortProps> = ({
  defaultVariantNumber = 0,
  variants,
  initialOrder,
  initialSort,
  className,
  contentWidth = '180px',
  styleVariant = 'default',
  customHandler,
  ...rest
}) => {
  const initialVariant = variants.find(
    (v) => v.field === initialSort && v.order === initialOrder
  );
  const [activeVariant, setActiveVariant] = useState(
    initialVariant ?? variants[defaultVariantNumber]
  );
  const [open, setOpen] = useState(false);

  const searchParams = useSearchParams();
  const [changeSearchParams] = useChangeSearchParams();

  const createQueryString = useCallback(
    (field: string, order: string) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const params = new URLSearchParams(searchParams);
      params.set('sort', field);
      params.set('order', order);

      return params.toString();
    },
    [searchParams]
  );

  const handleChoice = (variant: ISortVariant) => {
    setActiveVariant(variant);
    setOpen(false);

    customHandler
      ? customHandler(variant)
      : changeSearchParams(createQueryString(variant.field, variant.order));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          {...rest}
          className={cn(
            `w-[${contentWidth}] justify-between gap-1 `,
            styleVariant === 'default' && 'bg-secondary',
            styleVariant === 'transparent' && 'bg-inherit border-none',
            className
          )}
          variant='outline'
          role='combobox'
          aria-expanded={open}
        >
          {activeVariant.label ?? 'sort'} <Icons.chevronUpDown className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn(`w-[${contentWidth}] p-0 shadow-xl`)}>
        <ul>
          {variants.map((variant, i) => (
            <li
              key={i}
              className={cn(
                'cursor-pointer  p-2 pl-4 rounded text-sm font-medium',
                variant.field === activeVariant.field && variant.order === activeVariant.order
                  ? 'bg-active'
                  : 'hover:bg-muted/80'
              )}
              onClick={() => {
                handleChoice(variant);
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
