import { FC } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { LIMITS } from '@/configs/site.configs';

type SearchComicSkeletonsProps = {
  count?: number;
};

export const SearchComicSkeletons: FC<SearchComicSkeletonsProps> = ({
  count = LIMITS.comicsSearch,
}) => {
  const skeletonArray: undefined[] = Array.from({ length: count });

  return (
    <>
      {skeletonArray.map((_, i) => (
        <li key={i} className='flex w-full gap-2 rounded p-1'>
          <Skeleton className='h-24 w-16 rounded' />
          <div className='flex flex-col justify-center gap-1'>
            <Skeleton className='h-5 w-[250px]' />
            <Skeleton className='h-5 w-[150px]' />
            <Skeleton className='h-5 w-[100px]' />
          </div>
        </li>
      ))}
    </>
  );
};
