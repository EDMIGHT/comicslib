'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FC, HTMLAttributes } from 'react';

import { Icons } from '@/components/ui/icons';
import { PAGINATION_LIMIT_CONFIG } from '@/configs/site.configs';
import { cn } from '@/lib/utils';

type PaginationProps = HTMLAttributes<HTMLUListElement> & {
  initialLimit: number | string;
  currentPage?: number;
  totalPages: number;
  pageRange?: number;
};

export const Pagination: FC<PaginationProps> = ({
  initialLimit = PAGINATION_LIMIT_CONFIG.chapters,
  currentPage = 1,
  totalPages = 50,
  pageRange = 2,
  className,
  ...rest
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const limit = searchParams.get('limit') ?? initialLimit;
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const handlePageChange = (newPage: number) => {
    router.push(`?page=${newPage}&limit=${limit}`);
  };

  let startPage: number;
  let endPage: number;
  if (totalPages <= pageRange * 2 + 1) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= pageRange + 1) {
      startPage = 1;
      endPage = Math.min(pageRange * 2 + 1, totalPages);
    } else if (currentPage + pageRange >= totalPages) {
      startPage = Math.max(totalPages - pageRange * 2, 1);
      endPage = totalPages;
    } else {
      startPage = currentPage - pageRange;
      endPage = currentPage + pageRange;
    }
  }

  const pages = Array.from(Array(endPage + 1 - startPage).keys()).map((i) => startPage + i);

  return (
    <ul {...rest} className={cn('flex items-center gap-1 text-lg', className)}>
      <li>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!hasPrevPage}
          className='flex min-h-[2.5rem] min-w-[2.5rem] cursor-pointer items-center justify-center rounded-full enabled:cursor-pointer enabled:hover:bg-secondary disabled:text-muted'
        >
          <Icons.back />
        </button>
      </li>
      {currentPage > pageRange + 1 && (
        <>
          <li>
            <button
              onClick={() => handlePageChange(1)}
              className='flex min-h-[2.5rem] min-w-[2.5rem] cursor-pointer items-center justify-center rounded enabled:hover:bg-secondary disabled:bg-active disabled:hover:opacity-80'
            >
              1
            </button>
          </li>
          <li>
            <span className='flex h-[2.5rem] w-[2.5rem] items-center justify-center'>
              <Icons.more />
            </span>
          </li>
        </>
      )}

      {pages.map((page, i) => (
        <li key={i}>
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
            className='flex min-h-[2.5rem] min-w-[2.5rem] cursor-pointer items-center justify-center rounded enabled:hover:bg-secondary disabled:bg-active disabled:hover:opacity-80'
          >
            {page}
          </button>
        </li>
      ))}
      {currentPage + pageRange < totalPages && (
        <>
          <li>
            <span className='flex h-[2.5rem] w-[2.5rem] items-center justify-center'>
              <Icons.more />
            </span>
          </li>
          <li>
            <button
              onClick={() => handlePageChange(totalPages)}
              className='flex min-h-[2.5rem] min-w-[2.5rem] cursor-pointer items-center justify-center rounded  enabled:hover:bg-secondary disabled:bg-active disabled:hover:opacity-80'
            >
              {totalPages}
            </button>
          </li>
        </>
      )}

      <li>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className='flex min-h-[2.5rem] min-w-[2.5rem] cursor-pointer items-center justify-center rounded-full enabled:cursor-pointer enabled:hover:bg-secondary disabled:text-muted'
        >
          <Icons.next />
        </button>
      </li>
    </ul>
  );
};
