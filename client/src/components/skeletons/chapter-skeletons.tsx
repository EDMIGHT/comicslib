import { FC } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { LIMITS } from '@/configs/site.configs';

type ChapterSkeletonsProps = {
  count?: number;
};

export const ChapterSkeletons: FC<ChapterSkeletonsProps> = ({ count = LIMITS.chapters }) => {
  const skeletonArray: undefined[] = Array.from({ length: count });

  return (
    <>
      {skeletonArray.map((_, i) => (
        <Skeleton key={i} className='h-10 w-full' />
      ))}
    </>
  );
};
