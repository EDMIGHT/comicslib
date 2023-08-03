import { FC } from 'react';

import { IResponseComic } from '@/types/comic.types';

import { Icons } from './icons';

export const ComicInfo: FC<Pick<IResponseComic, 'avgRating' | '_count'>> = ({
  avgRating,
  _count: { comments, folders },
}) => {
  return (
    <ul className='flex items-center gap-2'>
      <li className='flex items-center gap-1'>
        <Icons.star />
        {avgRating || 0}
      </li>

      <li className='flex items-center gap-1'>
        <Icons.bookmark />

        {folders || 0}
      </li>

      <li className='flex items-center gap-1'>
        <Icons.comment />
        {comments || 0}
      </li>
    </ul>
  );
};
