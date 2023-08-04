import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { Card, CardTitle } from '@/components/ui/card';
import { IResponseComic } from '@/types/comic.types';

import { ComicGenres } from './comic-genres';
import { ComicInfo } from './comic-info';

type IComicsProps = {
  comics: IResponseComic[];
};

export const ComicsLine: FC<IComicsProps> = ({ comics }) => {
  return (
    <ul className='grid auto-cols-max grid-cols-2 gap-2'>
      {comics.map(({ id, title, desc, img, _count, avgRating, genres }) => (
        <li key={id}>
          <Card className='flex gap-2 p-2'>
            <Link href={`/comics/${id}`}>
              <div className='relative min-h-[200px] min-w-[160px] overflow-hidden rounded hover:opacity-80'>
                <Image
                  src={img}
                  alt={title}
                  sizes='200px'
                  fill
                  className='object-cover object-center '
                />
              </div>
            </Link>
            <div className='flex flex-col gap-2'>
              <Link href={`/comics/${id}`}>
                <CardTitle className='text-xl hover:opacity-80'>{title}</CardTitle>
              </Link>
              <ComicInfo avgRating={avgRating} _count={_count} />
              <ComicGenres genres={genres} />
              <p className='line-clamp-3'>{desc}</p>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
};
