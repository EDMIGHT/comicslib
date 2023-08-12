'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC, HTMLAttributes, useEffect, useState } from 'react';

import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';
import { cn } from '@/lib/utils';

type SearchProps = {} & HTMLAttributes<HTMLDivElement>;

export const Search: FC<SearchProps> = ({ className, ...rest }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState<undefined | string>();
  const [debounced] = useDebounce(value, 500);

  useEffect(() => {
    if (debounced !== undefined) {
      // @ts-ignore
      const params = new URLSearchParams(searchParams);
      params.set('title', debounced);

      router.push(pathname + (pathname.includes('?') ? '&' : '?') + params.toString());
    }
  }, [debounced]);

  return (
    <div {...rest} className={cn('relative', className)}>
      <Icons.search className='absolute left-2 top-1/2 -translate-y-1/2' />
      <Input
        type='text'
        placeholder='enter name of title..'
        className='bg-secondary p-5 pl-10 text-sm'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
