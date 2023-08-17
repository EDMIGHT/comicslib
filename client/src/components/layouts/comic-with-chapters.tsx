import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { IComicWithChapter } from '@/types/comic.types';

import { Card, CardTitle } from '../ui/card';
import { ChapterItem } from './chapter-item';

export const ComicWithChapters: FC<IComicWithChapter> = ({ id, img, title, chapters }) => {
  return (
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
      <div className='flex w-full flex-col gap-2'>
        <Link href={`/comics/${id}`}>
          <CardTitle className='text-xl hover:opacity-80'>{title}</CardTitle>
        </Link>
        {chapters.length > 0 ? (
          <ul className='flex w-full flex-col gap-1'>
            {chapters.map((chap) => (
              <li key={chap.id}>
                <ChapterItem {...chap} />
              </li>
            ))}
          </ul>
        ) : (
          <div>chapters not found</div>
        )}
      </div>
    </Card>
  );
};
