import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { Time } from '@/components/ui/time';
import { IResponseReadingHistory } from '@/types/user.types';

export const ReadingHistoryItem: FC<IResponseReadingHistory> = ({
  comic,
  page,
  chapter,
  updatedAt,
}) => {
  return (
    <Card className='flex gap-2 p-2'>
      <Link href={`/comics/${comic.id}`} className='flex flex-1 gap-2 hover:opacity-80'>
        <div className='relative h-[80px] w-[56px] overflow-hidden rounded'>
          <Image src={comic.img} alt={comic.title} fill />
        </div>
        <div className='flex h-full  flex-col justify-between gap-1'>
          <h2 className='text-xl font-medium'>{comic.title}</h2>
          <p className='text-sm'>
            Ch. {chapter.number} {chapter.title ? ` - ${chapter.title}` : ''}
          </p>
          <Time time={new Date(updatedAt)} />
        </div>
      </Link>

      <div className='flex flex-col justify-between gap-2'>
        <button className='self-end justify-self-end'>
          <Icons.delete className='h-5 w-5 hover:stroke-destructive' />
        </button>
        <Link href={`/chapter/${chapter.id}/${page.number}`} className={buttonVariants()}>
          continue
        </Link>
      </div>
    </Card>
  );
};
