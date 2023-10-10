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
      <Link href={`${HREFS.comics}/${id}`} className='hover:opacity-80'>
        <div className='h-[170px] w-[110px]  xl:h-[210px] xl:w-[140px]'>
          <Image
            src={img}
            alt={title}
            width={140}
            height={200}
            className='h-full w-full shrink-0 overflow-hidden rounded object-cover object-center'
          />
        </div>
      </Link>
      <div className='flex w-full flex-col gap-2'>
        <Link href={`${HREFS.comics}/${id}`}>
          <CardTitle className='hover:opacity-80 lg:text-xl'>{title}</CardTitle>
        </Link>
        <ComicChaptersList chapters={chapters} />
      </div>
    </Card>
  );
};
