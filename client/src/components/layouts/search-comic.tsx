import Image from 'next/image';
import { FC, HTMLAttributes } from 'react';

import { ComicCounters } from '@/components/comic-counters';
import { StatusBadge } from '@/components/status-badge';
import { cn } from '@/lib/utils';
import { IResponseComic } from '@/types/comic.types';

type SearchComicProps = HTMLAttributes<HTMLButtonElement> &
  Pick<
    IResponseComic,
    'id' | 'img' | 'title' | '_count' | 'avgRating' | 'countUniqueSubscribes' | 'status'
  >;

export const SearchComic: FC<SearchComicProps> = ({
  img,
  title,
  _count,
  avgRating,
  countUniqueSubscribes,
  status,
  className,
  ...props
}) => {
  return (
    <button
      type='button'
      {...props}
      className={cn(
        'grid grid-cols-[auto_1fr] w-full h-full gap-2 rounded p-1 transition-colors hover:bg-secondary/75',
        className
      )}
    >
      <Image
        src={img}
        alt={title}
        width={80}
        height={96}
        className='h-24 w-16 overflow-hidden rounded object-cover object-center'
      />

      <div className='flex h-full flex-col justify-between gap-1 py-1'>
        <h3 className='line-clamp-1 w-fit text-xl font-semibold'>{title}</h3>

        <ComicCounters
          _count={_count}
          avgRating={avgRating}
          countUniqueSubscribes={countUniqueSubscribes}
        />
        <StatusBadge status={status.name} className='w-fit' variant='transparent' />
      </div>
    </button>
  );
};
