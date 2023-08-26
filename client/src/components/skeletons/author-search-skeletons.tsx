import { FC } from 'react';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type AuthorSearchSkeletonsProps = {
  count?: number;
};

export const AuthorSearchSkeletons: FC<AuthorSearchSkeletonsProps> = ({ count = 5 }) => {
  const skeletonArray: undefined[] = Array.from({ length: count });

  return (
    <>
      {skeletonArray.map((_, i) => (
        <li key={i}>
          <Skeleton className='h-5 w-full' />
        </li>
      ))}
    </>
  );
};
