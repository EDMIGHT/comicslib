'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FC, useEffect, useRef } from 'react';

import { useIntersection } from '@/hooks/use-intersection';
import { UserService } from '@/services/users.service';

import { ReadingHistoryItem } from './layouts/reading-history-item';

type ReadingHistoryFeedProps = {
  login: string;
};

export const ReadingHistoryFeed: FC<ReadingHistoryFeedProps> = ({ login }) => {
  const lastCommentRef = useRef<HTMLLIElement>(null);
  const [parent] = useAutoAnimate();

  const { ref, entry } = useIntersection({
    root: lastCommentRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, hasNextPage, isLoading, isSuccess } = useInfiniteQuery(
    ['reading-history'],
    async ({ pageParam = 1 }) => {
      return await UserService.getAllReadingHistory({
        login,
        page: pageParam,
      });
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.currentPage < lastPage.totalPages) {
          return lastPage.currentPage + 1;
        } else {
          return undefined;
        }
      },
    }
  );

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage, hasNextPage]);

  const history = data?.pages.flatMap((page) => page.history);

  return (
    <ul ref={parent} className='flex flex-col gap-2'>
      {isSuccess &&
        (history && history.length > 0 ? (
          history.map((hist, i) => {
            if (i === history.length - 1) {
              return (
                <li key={hist.comicId} ref={ref}>
                  <ReadingHistoryItem {...hist} />
                </li>
              );
            } else {
              return (
                <li key={hist.comicId}>
                  <ReadingHistoryItem {...hist} />
                </li>
              );
            }
          })
        ) : (
          <div className='col-span-2 flex h-[50vh] items-center justify-center text-center'>
            <h3 className='text-xl font-medium md:text-3xl'>
              Your reading history is empty 😢
            </h3>
          </div>
        ))}
      {/* {isLoading && <ComicSkeletons />} */}
    </ul>
  );
};
