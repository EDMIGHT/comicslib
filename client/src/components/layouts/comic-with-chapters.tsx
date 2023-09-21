import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { ComicChaptersList } from '@/components/comic-chapters-list';
import { Card, CardTitle } from '@/components/ui/card';
import { HREFS } from '@/configs/href.configs';
import { IComicWithChapter } from '@/types/comic.types';

export const ComicWithChapters: FC<IComicWithChapter> = ({ id, img, title, chapters }) => {
  return (
    <Card className='flex gap-2 p-2'>
      <Link href={`${HREFS.comics}/${id}`}>
        <div className='relative h-[200px] w-[140px] overflow-hidden rounded hover:opacity-80'>
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
        <Link href={`${HREFS.comics}/${id}`}>
          <CardTitle className='text-xl hover:opacity-80'>{title}</CardTitle>
        </Link>
        <ComicChaptersList chapters={chapters} />
      </div>
    </Card>
  );
};
