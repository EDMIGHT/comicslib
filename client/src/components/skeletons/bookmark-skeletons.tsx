import { FC } from 'react';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { PAGINATION_LIMIT_CONFIG } from '@/configs/site.configs';

type BookmarkSkeletonsProps = {
  count?: number;
};

export const BookmarkSkeletons: FC<BookmarkSkeletonsProps> = ({
  count = PAGINATION_LIMIT_CONFIG.bookmarks,
}) => {
  const skeletonArray: undefined[] = Array.from({ length: count });

  return (
    <>
      {skeletonArray.map((_, i) => (
        <li key={i}>
          <Card className='flex gap-2 p-2'>
            <Skeleton className='h-[80px] w-[56px] rounded' />
            <div className='flex flex-1 flex-col justify-between gap-1'>
              <Skeleton className='h-5 w-[120px]' />
              <Skeleton className='h-5 w-[80px]' />
              <Skeleton className='h-5 w-[50px]' />
            </div>
            <div className='flex flex-col justify-between'>
              <Skeleton className='h-5 w-7 self-end' />
              <Skeleton className='h-8 w-[80px]' />
            </div>
          </Card>
        </li>
      ))}
    </>
  );
};
