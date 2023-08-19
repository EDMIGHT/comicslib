import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { ComicCounters } from '@/components/comic-counters';
import { ComicGenres } from '@/components/comic-genres';
import { Card, CardTitle } from '@/components/ui/card';
import { IResponseComic } from '@/types/comic.types';

export const Comic: FC<IResponseComic> = ({
  id,
  _count,
  avgRating,
  genres,
  desc,
  img,
  title,
  countUniqueSubscribes,
}) => {
  return (
    <Card className='flex gap-2 p-2'>
      <Link href={`/comics/${id}`}>
        <div className='relative h-[200px] w-[140px] overflow-hidden rounded hover:opacity-80'>
          <Image src={img} alt={title} fill className='object-cover object-center' />
        </div>
      </Link>
      <div className='flex flex-col gap-2'>
        <Link href={`/comics/${id}`}>
          <CardTitle className='text-xl hover:opacity-80'>{title}</CardTitle>
        </Link>
        <ComicCounters
          avgRating={avgRating}
          _count={_count}
          countUniqueSubscribes={countUniqueSubscribes}
        />
        <ComicGenres genres={genres} />
        <p className='line-clamp-3'>{desc}</p>
      </div>
    </Card>
  );
};
