'use client';

import { useRouter } from 'next/navigation';
import { FC, MouseEvent, ReactNode, useCallback, useEffect } from 'react';

import { HREFS } from '@/configs/href.configs';
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

  const onClickToPrevPage = useCallback(() => {
    if (page > 1) {
      router.push(`${HREFS.chapter}/${chapterId}/${Number(page) - 1}`);
    } else if (prevChapter) {
      router.push(`${HREFS.chapter}/${prevChapter.id}`);
    } else {
      router.push(`${HREFS.comics}/${comicId}`);
    }
  }, [chapterId, comicId, page, prevChapter, router]);

  const onClickToNextPage = useCallback(() => {
    if (page < totalPages) {
      router.push(`${HREFS.chapter}/${chapterId}/${Number(page) + 1}`);
    } else if (nextChapter) {
      router.push(`${HREFS.chapter}/${nextChapter.id}`);
    } else {
      router.push(`${HREFS.comics}/${comicId}`);
    }
  }, [chapterId, comicId, nextChapter, page, router, totalPages]);

  const onClickBlock = (e: MouseEvent<HTMLDivElement>) => {
    const block = e.currentTarget;
    const blockRect = block.getBoundingClientRect();
    const clickX = e.clientX - blockRect.left;
    const blockWidth = blockRect.width;

    if (clickX < blockWidth / 2) {
      onClickToPrevPage();
    } else {
      onClickToNextPage();
    }
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        onClickToNextPage();
      } else if (e.key === 'ArrowLeft') {
        onClickToPrevPage();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [onClickToNextPage, onClickToPrevPage]);

  return (
    <div onClick={onClickBlock} className='w-full cursor-pointer'>
      {children}
    </div>
  );
};
