'use client';

import { useRouter } from 'next/navigation';
import { FC, HTMLAttributes } from 'react';

import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

type PaginationProps = HTMLAttributes<HTMLUListElement> & {
  currentPage: number;
  totalPages: number;
  pageRange?: number;
  customHandlePageChange?: (newPage: number) => void;
  isBlocked?: boolean;
};

export const Pagination: FC<PaginationProps> = ({
  currentPage = 1,
  totalPages = 50,
  pageRange = 2,
  className,
  isBlocked = false,
  customHandlePageChange,
  ...rest
}) => {
  const router = useRouter();

  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const handlePageChange = (newPage: number) => {
    router.push(`?page=${newPage}`);
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
          type='button'
          onClick={() =>
            customHandlePageChange
              ? customHandlePageChange(currentPage - 1)
              : handlePageChange(currentPage - 1)
          }
          disabled={isBlocked || !hasPrevPage}
          className={cn(
            'flex min-h-[2.5rem] min-w-[2.5rem] cursor-pointer items-center justify-center rounded-full  ',
            isBlocked || !hasPrevPage ? 'text-muted' : 'cursor-pointer hover:bg-secondary'
          )}
        >
          <Icons.back />
        </button>
      </li>
      {currentPage > pageRange + 1 && (
        <>
          <li>
            <button
              type='button'
              disabled={isBlocked}
              onClick={() =>
                customHandlePageChange ? customHandlePageChange(1) : handlePageChange(1)
              }
              className='flex min-h-[2.5rem] min-w-[2.5rem] cursor-pointer items-center justify-center rounded enabled:hover:bg-secondary disabled:brightness-75'
            >
              1
            </button>
          </li>
          <li>
            <span
              className={cn(
                'flex h-[2.5rem] w-[2.5rem] items-center justify-center',
                isBlocked && 'brightness-75'
              )}
            >
              <Icons.more />
            </span>
          </li>
        </>
      )}

      {pages.map((page, i) => (
        <li key={i}>
          <button
            key={page}
            type='button'
            onClick={() =>
              customHandlePageChange ? customHandlePageChange(page) : handlePageChange(page)
            }
            disabled={isBlocked || page === currentPage}
            className={cn(
              'flex min-h-[2.5rem] min-w-[2.5rem] cursor-pointer items-center justify-center rounded enabled:hover:bg-secondary',
              page === currentPage && 'bg-active hover:opacity-80',
              isBlocked && 'brightness-75'
            )}
          >
            {page}
          </button>
        </li>
      ))}
      {endPage < totalPages && (
        <>
          <li>
            <span
              className={cn(
                'flex h-[2.5rem] w-[2.5rem] items-center justify-center',
                isBlocked && 'brightness-75'
              )}
            >
              <Icons.more />
            </span>
          </li>
          <li>
            <button
              type='button'
              disabled={isBlocked}
              onClick={() =>
                customHandlePageChange
                  ? customHandlePageChange(totalPages)
                  : handlePageChange(totalPages)
              }
              className={cn(
                'flex min-h-[2.5rem] min-w-[2.5rem] cursor-pointer items-center justify-center rounded  enabled:hover:bg-secondary disabled:brightness-75'
              )}
            >
              {totalPages}
            </button>
          </li>
        </>
      )}

      <li>
        <button
          type='button'
          onClick={() =>
            customHandlePageChange
              ? customHandlePageChange(currentPage + 1)
              : handlePageChange(currentPage + 1)
          }
          disabled={isBlocked || !hasNextPage}
          className={cn(
            'flex min-h-[2.5rem] min-w-[2.5rem] cursor-pointer items-center justify-center rounded-full  ',
            isBlocked || !hasNextPage ? 'text-muted' : 'cursor-pointer hover:bg-secondary'
          )}
        >
          <Icons.next />
        </button>
      </li>
    </ul>
  );
};
