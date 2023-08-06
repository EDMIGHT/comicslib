'use client';

import { useRouter } from 'next/navigation';
import { FC, MouseEvent, ReactNode, useEffect } from 'react';

import { useActions } from '@/hooks/use-actions';

type PageBackgroundProps = {
  children: ReactNode;
  page: number;
  chapterId: string;
  totalPages: number;
};

export const PageBackground: FC<PageBackgroundProps> = ({
  children,
  chapterId,
  page,
  totalPages,
}) => {
  const router = useRouter();

  // const { setIsActiveMenu } = useActions();

  // useEffect(() => {
  //   setIsActiveMenu(false);
  // }, []);

  const onClickBlock = (e: MouseEvent<HTMLDivElement>) => {
    const block = e.currentTarget;
    const blockRect = block.getBoundingClientRect();
    const clickX = e.clientX - blockRect.left;
    const blockWidth = blockRect.width;

    if (clickX < blockWidth / 2) {
      if (page > 1) {
        router.push(`/chapter/${chapterId}/${Number(page) - 1}`);
      }
    } else {
      if (page < totalPages) {
        router.push(`/chapter/${chapterId}/${Number(page) + 1}`);
      }
    }
  };

  return (
    <div onClick={onClickBlock} className='w-full cursor-pointer'>
      {children}
    </div>
  );
};
