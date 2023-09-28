import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { ComicAttributes } from '@/components/comic-attributes';
import { ComicCounters } from '@/components/comic-counters';
import { StatusBadge } from '@/components/status-badge';
import { Card, CardTitle } from '@/components/ui/card';
import { HREFS } from '@/configs/href.configs';
import { IResponseComic } from '@/types/comic.types';

export const Comic: FC<IResponseComic> = ({
  id,
  genres,
  themes,
  desc,
  img,
  title,
  status,
  comments_count,
  avg_rating,
  unique_bookmarks_count,
}) => {
  return (
    <Card className='flex gap-2 p-2'>
      <Link href={`${HREFS.comics}/${id}`} className='hover:opacity-80'>
        <div className='h-[170px] w-[110px] xl:h-[200px] xl:w-[140px]'>
          <Image
            src={img}
            alt={title}
            width={140}
            height={200}
            className='h-full w-full shrink-0 overflow-hidden rounded object-cover object-center'
          />
        </div>
      </Link>
      <div className='flex flex-1 flex-col gap-2'>
        <Link href={`${HREFS.comics}/${id}`}>
          <CardTitle className='text-xl hover:opacity-80'>{title}</CardTitle>
        </Link>
        <div className='flex justify-between gap-1'>
          <ComicCounters
            avg_rating={avg_rating}
            comments_count={comments_count}
            unique_bookmarks_count={unique_bookmarks_count}
          />

          <StatusBadge status={status.name} variant='transparent' type='link' />
        </div>
        <ComicAttributes genres={genres} themes={themes} />
        <p className='line-clamp-3 text-sm xl:text-base'>{desc}</p>
      </div>
    </Card>
  );
};
