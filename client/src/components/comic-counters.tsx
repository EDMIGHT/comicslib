import { FC, HTMLAttributes } from 'react';

import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import { IResponseComic } from '@/types/comic.types';

type ComicCountersProps = Pick<
  IResponseComic,
  'avg_rating' | 'comments_count' | 'unique_bookmarks_count'
> &
  HTMLAttributes<HTMLUListElement>;

export const ComicCounters: FC<ComicCountersProps> = ({
  avg_rating,
  comments_count,
  unique_bookmarks_count,
  className,
  ...rest
}) => {
  return (
    <ul {...rest} className={cn('flex flex-wrap items-center gap-2', className)}>
      <li className='flex items-center gap-1 '>
        <Icons.star className='fill-foreground' />
        {avg_rating.toFixed(2)}
      </li>

      <li className='flex items-center gap-1'>
        <Icons.bookmark className='fill-foreground' />
        {unique_bookmarks_count}
      </li>

      <li className='flex items-center gap-1'>
        <Icons.comment className='fill-foreground' />
        {comments_count}
      </li>
    </ul>
  );
};
