'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FC, useState } from 'react';

import { ChapterItem } from '@/components/layouts/chapter-item';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IChapterWithUser } from '@/types/chapter.types';

type ComicChaptersListProps = {
  chapters: IChapterWithUser[];
  limit?: number;
};

export const ComicChaptersList: FC<ComicChaptersListProps> = ({ chapters, limit = 3 }) => {
  const [parent] = useAutoAnimate();

  const [isShowMore, setIsShowMore] = useState(false);

  return (
    <div className='flex flex-col gap-2'>
      {chapters.length > 0 ? (
        <ul ref={parent} className='flex w-full flex-col gap-1'>
          {(isShowMore ? chapters : chapters.slice(0, limit)).map((chap) => (
            <li key={chap.id}>
              <ChapterItem variant='transparent' {...chap} />
            </li>
          ))}
        </ul>
      ) : (
        <div>chapters not found</div>
      )}
      {chapters.length > limit && (
        <button
          onClick={() => setIsShowMore((prev) => !prev)}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'text-sm font-semibold uppercase text-active w-fit py-1 px-2 h-fit mx-auto'
          )}
        >
          {isShowMore ? 'show less' : 'show all'}
        </button>
      )}
    </div>
  );
};
