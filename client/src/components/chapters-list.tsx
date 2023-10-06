'use client';

import { useRouter } from 'next/navigation';
import { FC, useTransition } from 'react';

import { ChapterItem } from '@/components/layouts/chapter-item';
import { ChapterSkeletons } from '@/components/skeletons/chapter-skeletons';
import { Pagination } from '@/components/ui/pagination';
import { IResponseAllChapters } from '@/types/chapter.types';

export const ChaptersList: FC<IResponseAllChapters> = ({
  chapters,
  totalPages,
  currentPage,
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <ul className='flex flex-col gap-1'>
        {!isPending ? (
          chapters.map((chap) => (
            <li key={chap.id}>
              <ChapterItem {...chap} />
            </li>
          ))
        ) : (
          <ChapterSkeletons />
        )}
      </ul>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          isBlocked={isPending}
          className='justify-center'
          customHandlePageChange={(newPage) =>
            startTransition(() => {
              router.push(`?page=${newPage}`);
            })
          }
        />
      )}
    </>
  );
};
