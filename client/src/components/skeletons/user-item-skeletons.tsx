import { FC } from 'react';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { PAGINATION_LIMIT_CONFIG } from '@/configs/site.configs';

type UserItemSkeletonsProps = {
  count?: number;
};

export const UserItemSkeletons: FC<UserItemSkeletonsProps> = ({
  count = PAGINATION_LIMIT_CONFIG.users,
}) => {
  const skeletonArray: undefined[] = Array.from({ length: count });

  return (
    <>
      {skeletonArray.map((_, i) => (
        <li key={i}>
          <Card className='flex items-center gap-2 p-2'>
            <Skeleton className='h-10 w-10 rounded' />
            <Skeleton className='h-7 flex-1' />
            <div className='flex gap-1'>
              <Skeleton className='h-7 w-10' />
              <Skeleton className='h-7 w-10' />
            </div>
          </Card>
        </li>
      ))}
    </>
  );
};
