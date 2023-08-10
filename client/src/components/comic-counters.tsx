import { FC } from 'react';

import { IResponseComic } from '@/types/comic.types';

import { Icons } from './ui/icons';

export const ComicCounters: FC<Pick<IResponseComic, 'avgRating' | '_count'>> = ({
  avgRating,
  _count: { comments, folders },
}) => {
  return (
    <ul className='flex items-center gap-2'>
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
