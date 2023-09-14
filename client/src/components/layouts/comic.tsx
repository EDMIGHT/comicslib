import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { ComicAttributes } from '@/components/comic-attributes';
import { ComicCounters } from '@/components/comic-counters';
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
  comments_count,
  avg_rating,
  unique_bookmarks_count,
}) => {
  return (
    <Card className='flex gap-2 p-2'>
      <Link href={`${HREFS.comics}/${id}`}>
        <div className='h-[200px] w-[140px]'>
          <Image
            src={img}
            alt={title}
            width={140}
            height={200}
            className='h-full w-full overflow-hidden rounded object-cover object-center hover:opacity-80'
          />
        </div>
      </Link>
      <div className='flex flex-col gap-2'>
        <Link href={`${HREFS.comics}/${id}`}>
          <CardTitle className='text-xl hover:opacity-80'>{title}</CardTitle>
        </Link>
        <ComicCounters
          avg_rating={avg_rating}
          comments_count={comments_count}
          unique_bookmarks_count={unique_bookmarks_count}
        />
        <ComicAttributes genres={genres} themes={themes} />
        <p className='line-clamp-3'>{desc}</p>
      </div>
    </Card>
  );
};
