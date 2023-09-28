'use client';

import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { FC, HTMLAttributes, useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Command, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { Icons } from '@/components/ui/icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { COMIC_DATE_FIELDS } from '@/configs/comic.configs';
import { useChangeSearchParams } from '@/hooks/use-change-search-params';
import { cn } from '@/lib/utils';
import { IConfigVariant } from '@/types/configs.types';

type DatesFilterProps = HTMLAttributes<HTMLDivElement>;

export enum DateFilterSearchParams {
  DATE = 'date',
  START_DATE = 'startDate',
  END_DATE = 'endDate',
}

export const DateFilter: FC<DatesFilterProps> = ({ className, ...rest }) => {
  const searchParams = useSearchParams()!;
  const [changeSearchParams] = useChangeSearchParams();

  const initialVariant = searchParams.get(DateFilterSearchParams.DATE);
  const initialDateFrom = searchParams.get(DateFilterSearchParams.START_DATE);
  const initialDateTo = searchParams.get(DateFilterSearchParams.END_DATE);

  const [dateFrom, setDateFrom] = useState<Date | undefined>(
    typeof initialDateFrom === 'string' ? new Date(initialDateFrom) : undefined
  );
  const [dateTo, setDateTo] = useState<Date | undefined>(
    typeof initialDateTo === 'string' ? new Date(initialDateTo) : undefined
  );

  const [currentVariant, setCurrentVariant] = useState<string | undefined>(
    initialVariant || undefined
  );
  const [isOpenVariant, setIsOpenVariant] = useState(false);

  const createQueryString = useCallback(
    (name: 'date' | 'startDate' | 'endDate', field: string | undefined) => {
      // https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const params = new URLSearchParams(searchParams);
      if (!field) {
        params.delete(name);
      } else {
        params.set(name, field);
      }

      return params.toString();
    },
    [searchParams]
  );

  const onClickDateFrom = (selectedDate: Date | undefined) => {
    setDateFrom(selectedDate);

    const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : undefined;

    changeSearchParams(createQueryString('startDate', formattedDate));
  };
  const onClickDateTo = (selectedDate: Date | undefined) => {
    setDateTo(selectedDate);

    const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : undefined;

    changeSearchParams(createQueryString('endDate', formattedDate));
  };
  const onClickDateVariant = (selectedVariant: IConfigVariant) => {
    setCurrentVariant((prev) =>
      prev === selectedVariant.field ? undefined : selectedVariant.field
    );

    // ? в теории невозможно получить stale данных, на практике возможно
    changeSearchParams(
      createQueryString(
        'date',
        currentVariant === selectedVariant.field ? undefined : selectedVariant.field
      )
    );
  };

  const currentDate = new Date();

  return (
    <div {...rest} className={cn('flex flex-wrap items-center gap-1', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className={cn(
              'w-[250px] justify-start text-left font-normal',
              !dateFrom && 'text-muted-foreground'
            )}
          >
            <Icons.calendar className='mr-2 h-4 w-4' />
            {dateFrom ? format(dateFrom, 'PPP') : <span>From this date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            mode='single'
            captionLayout='dropdown-buttons'
            selected={dateFrom}
            onSelect={onClickDateFrom}
            disabled={(date) => date > currentDate || date < new Date('1900-01-01')}
            fromYear={1900}
            toYear={currentDate.getFullYear()}
          />
        </PopoverContent>
      </Popover>

      <Popover open={isOpenVariant} onOpenChange={setIsOpenVariant}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            className={cn(
              'w-[170px] justify-start text-left font-normal',
              !currentVariant && 'text-muted-foreground'
            )}
          >
            {currentVariant
              ? COMIC_DATE_FIELDS.find((variant) => variant.field === currentVariant)?.title
              : 'select date field'}

            <Icons.chevronUpDown className='ml-2 h-4 w-4' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[170px] p-0'>
          <Command>
            <CommandEmpty>Missing values in config</CommandEmpty>
            <CommandGroup>
              {COMIC_DATE_FIELDS.map((variant) => (
                <CommandItem
                  key={variant.field}
                  onSelect={() => {
                    onClickDateVariant(variant);
                    setIsOpenVariant(false);
                  }}
                >
                  {variant.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className={cn(
              'w-[250px] justify-start text-left font-normal',
              !dateTo && 'text-muted-foreground'
            )}
          >
            <Icons.calendar className='mr-2 h-4 w-4' />
            {dateTo ? format(dateTo, 'PPP') : <span>To this date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            mode='single'
            captionLayout='dropdown-buttons'
            selected={dateTo}
            onSelect={onClickDateTo}
            disabled={(date) => date > currentDate || date < new Date('1900-01-01')}
            fromYear={1900}
            toYear={currentDate.getFullYear()}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
