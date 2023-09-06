'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { Button } from '@/components/ui/button';

type ComicChaptersPaginationProps = {
  page: number;
  chapterId: string;
  totalPages: number;
};

export const ChapterPagination: FC<ComicChaptersPaginationProps> = ({
  page,
  chapterId,
  totalPages,
}) => {
  const router = useRouter();

  return (
    <div className='flex items-center justify-center gap-2'>
      <Button
        onClick={() => {
          router.push(`/chapter/${chapterId}/${Number(page) - 1}`);
        }}
        disabled={!(page > 1)}
      >
        prev
      </Button>

      <div>
        {page}/{totalPages}
      </div>

      <Button
        onClick={() => {
          router.push(`/chapter/${chapterId}/${Number(page) + 1}`);
        }}
        disabled={!(page < totalPages)}
      >
        next
      </Button>
    </div>
  );
};
