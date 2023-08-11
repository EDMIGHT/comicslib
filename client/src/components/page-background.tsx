'use client';

import { useRouter } from 'next/navigation';
import { FC, MouseEvent, ReactNode, useEffect } from 'react';

import { useActions } from '@/hooks/use-actions';
import { IChapter } from '@/types/chapter.types';

type PageBackgroundProps = {
  children: ReactNode;
  page: number;
  comicId: string;
  chapterId: string;
  totalPages: number;
  nextChapter: IChapter | null;
  prevChapter: IChapter | null;
};

export const PageBackground: FC<PageBackgroundProps> = ({
  children,
  chapterId,
  comicId,
  page,
  totalPages,
  nextChapter,
  prevChapter,
}) => {
  const router = useRouter();

  const onClickBlock = (e: MouseEvent<HTMLDivElement>) => {
    const block = e.currentTarget;
    const blockRect = block.getBoundingClientRect();
    const clickX = e.clientX - blockRect.left;
    const blockWidth = blockRect.width;

    if (clickX < blockWidth / 2) {
      if (page > 1) {
        router.push(`/chapter/${chapterId}/${Number(page) - 1}`);
      } else if (prevChapter) {
        router.push(`/chapter/${prevChapter.id}`);
      } else {
        router.push(`/comics/${comicId}`);
      }
    } else {
      if (page < totalPages) {
        router.push(`/chapter/${chapterId}/${Number(page) + 1}`);
      } else if (nextChapter) {
        router.push(`/chapter/${nextChapter.id}`);
      } else {
        router.push(`/comics/${comicId}`);
      }
    }
  };

  return (
    <div onClick={onClickBlock} className='w-full cursor-pointer'>
      {children}
    </div>
  );
};
