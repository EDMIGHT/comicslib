'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FC, useEffect, useRef } from 'react';

import { Bookmark } from '@/components/layouts/bookmark';
import { BookmarkSkeletons } from '@/components/skeletons/bookmark-skeletons';
import { useAuth } from '@/hooks/use-auth';
import { useIntersection } from '@/hooks/use-intersection';
import { UserService } from '@/services/users.service';

type BookmarksFeedProps = {
  login: string;
};

export const BookmarksFeed: FC<BookmarksFeedProps> = ({ login }) => {
  const { user } = useAuth();
  const lastCommentRef = useRef<HTMLLIElement>(null);
  const [parent] = useAutoAnimate();

  const { ref, entry } = useIntersection({
    root: lastCommentRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, hasNextPage, isLoading, isSuccess } = useInfiniteQuery(
    ['bookmarks'],
    async ({ pageParam = 1 }) => {
      return await UserService.getAllBookmarks({
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

  const bookmarks = data?.pages.flatMap((page) => page.history);

  return (
    <ul ref={parent} className='flex flex-col gap-2'>
      {isSuccess &&
        (bookmarks && bookmarks.length > 0 ? (
          bookmarks.map((hist, i) => {
            if (i === bookmarks.length - 1) {
              return (
                <li key={hist.comicId} ref={ref}>
                  <Bookmark {...hist} currentUser={user} />
                </li>
              );
            } else {
              return (
                <li key={hist.comicId}>
                  <Bookmark {...hist} currentUser={user} />
                </li>
              );
            }
          })
        ) : (
          <div className='col-span-2 flex h-[50vh] items-center justify-center text-center'>
            <h3 className='text-xl font-medium md:text-3xl'>No bookmarks found 😢</h3>
          </div>
        ))}
      {isLoading && <BookmarkSkeletons />}
    </ul>
  );
};
