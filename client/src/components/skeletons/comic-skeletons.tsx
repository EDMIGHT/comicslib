import { FC } from 'react';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { PAGINATION_LIMIT_CONFIG } from '@/configs/site.configs';

type ComicSkeletonsProps = {
  count?: number;
};

export const ComicSkeletons: FC<ComicSkeletonsProps> = ({
  count = PAGINATION_LIMIT_CONFIG.comics,
}) => {
  const skeletonArray: undefined[] = Array.from({ length: count });

  return (
    <>
      {skeletonArray.map((_, i) => (
        <li key={i}>
          <Card className='flex gap-2 p-2'>
            <Skeleton className='min-h-[200px] min-w-[160px]' />
            <div className='flex w-full flex-col gap-2'>
              <Skeleton className='h-10 w-[200px]' />
              <Skeleton className='h-12 w-[200px]' />
              <Skeleton className='h-10 w-[200px]' />
              <Skeleton className='h-full w-full' />
            </div>
          </Card>
        </li>
      ))}
    </>
  );
};