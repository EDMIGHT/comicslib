'use client';

import { useSearchParams } from 'next/navigation';
import { FC, HTMLAttributes, useEffect, useState } from 'react';

import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { useChangeSearchParams } from '@/hooks/use-change-search-params';
import { useDebounce } from '@/hooks/use-debounce';
import { cn } from '@/lib/utils';

type SearchProps = {
  initialValue?: string;
  paramsKey: string;
  placeholder?: string;
} & HTMLAttributes<HTMLDivElement>;

export const Search: FC<SearchProps> = ({
  className,
  paramsKey,
  initialValue = '',
  placeholder = 'enter text..',
  ...rest
}) => {
  const searchParams = useSearchParams();
  const [changeSearchParams] = useChangeSearchParams();
  const [value, setValue] = useState<string>(initialValue);
  const [isChanged, setIsChanged] = useState(false);
  const [debounced] = useDebounce(value, 500);

  useEffect(() => {
    if (isChanged) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const params = new URLSearchParams(searchParams);
      params.set(paramsKey, debounced.trim());
      changeSearchParams(params.toString());
    }
  }, [debounced, searchParams, paramsKey, changeSearchParams, isChanged]);

  return (
    <div {...rest} className={cn('relative', className)}>
      <Icons.search className='absolute left-2 top-1/2 -translate-y-1/2' />
      <Input
        type='text'
        placeholder={placeholder}
        className='bg-secondary py-3 pl-10 text-sm'
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          !isChanged && setIsChanged(true);
        }}
      />
    </div>
  );
};
