import { FC } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { LIMITS } from '@/configs/site.configs';

type CommentSkeletonsProps = {
  count?: number;
};

export const CommentSkeletons: FC<CommentSkeletonsProps> = ({ count = LIMITS.comments }) => {
  const skeletonArray: undefined[] = Array.from({ length: count });

  return (
    <>
      {skeletonArray.map((_, i) => (
        <div key={i} className='space-y-2 p-2'>
          <div className='flex items-center gap-2'>
            <Skeleton key={i} className='h-10 w-10 rounded-full' />
            <Skeleton key={i} className='h-6 w-[120px]' />
          </div>
          <Skeleton key={i} className='h-12 w-[60vw] pl-2' />
        </div>
      ))}
    </>
  );
};
