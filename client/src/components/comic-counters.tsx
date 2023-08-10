import { FC, HTMLAttributes } from 'react';

import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import { IResponseComic } from '@/types/comic.types';

type ComicCountersProps = Pick<IResponseComic, 'avgRating' | '_count'> &
  HTMLAttributes<HTMLUListElement>;

export const ComicCounters: FC<ComicCountersProps> = ({
  avgRating,
  _count: { comments, folders },
  className,
  ...rest
}) => {
  return (
    <ul {...rest} className={cn('flex items-center gap-2', className)}>
      <li className='flex items-center gap-1 '>
        <Icons.star className='fill-foreground' />
        {avgRating || 0}
      </li>

      <li className='flex items-center gap-1'>
        <Icons.bookmark className='fill-foreground' />
        {folders || 0}
      </li>

      <li className='flex items-center gap-1'>
        <Icons.comment className='fill-foreground' />
        {comments || 0}
      </li>
    </ul>
  );
};
