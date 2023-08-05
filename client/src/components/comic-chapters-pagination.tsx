'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { PAGINATION_LIMIT_CONFIG } from '@/configs/site.configs';

type ComicChaptersPaginationProps = {
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export const ComicChaptersPagination: FC<ComicChaptersPaginationProps> = ({
  totalPages,
  hasNextPage,
  hasPrevPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? PAGINATION_LIMIT_CONFIG.chapters;

  return (
    <div className='flex items-center justify-center gap-2'>
      <Button
        onClick={() => {
          router.push(`?page=${Number(page) - 1}&limit=${limit}`);
        }}
        disabled={!hasPrevPage}
      >
        prev
      </Button>

      <div>
        {page}/{totalPages}
      </div>

      <Button
        onClick={() => {
          router.push(`?page=${Number(page) + 1}&limit=${limit}`);
        }}
        disabled={!hasNextPage}
      >
        next
      </Button>
    </div>
  );
};
