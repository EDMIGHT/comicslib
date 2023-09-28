import { FC } from 'react';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { LIMITS } from '@/configs/site.configs';

type ComicSkeletonsProps = {
  count?: number;
};

export const ComicSkeletons: FC<ComicSkeletonsProps> = ({ count = LIMITS.comics }) => {
  const skeletonArray: undefined[] = Array.from({ length: count });

  return (
    <>
      {skeletonArray.map((_, i) => (
        <li key={i}>
          <Card className='flex gap-2 p-2'>
            <Skeleton className='h-[170px] w-[110px] shrink-0 xl:h-[200px] xl:w-[140px]' />
            <div className='flex w-full flex-col gap-2'>
              <Skeleton className='h-12 w-[200px]' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-full w-full' />
            </div>
          </Card>
        </li>
      ))}
    </>
  );
};
