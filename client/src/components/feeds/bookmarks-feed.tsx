'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useRef } from 'react';

import { Bookmark } from '@/components/layouts/bookmark';
import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { BookmarkSkeletons } from '@/components/skeletons/bookmark-skeletons';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useIntersection } from '@/hooks/use-intersection';
import { ErrorHandler } from '@/lib/helpers/error-handler.helper';
import { IGetAllBookmarksArg, UsersService } from '@/services/users.service';
import { isInvalidResponseWithDetails } from '@/types/response.types';
import { IUser } from '@/types/user.types';

type BookmarksFeedProps = IGetAllBookmarksArg & {
  currentUser: IUser | null;
};

export const BookmarksFeed: FC<BookmarksFeedProps> = ({
  login,
  currentUser,
  ...searchQuery
}) => {
  const router = useRouter();
  const [parent] = useAutoAnimate();
  const lastCommentRef = useRef<HTMLLIElement>(null);

  const { ref, entry } = useIntersection({
    root: lastCommentRef.current,
    threshold: 1,
  });

  const { data, refetch, fetchNextPage, hasNextPage, isLoading, isSuccess, isError } =
    useInfiniteQuery({
      queryKey: [REACT_QUERY_KEYS.bookmarks, searchQuery.title],
      queryFn: async ({ pageParam = 1 }: { pageParam?: number }) => {
        return await UsersService.getAllBookmarks({
          ...searchQuery,
          login,
          page: pageParam,
        });
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.currentPage < lastPage.totalPages) {
          return lastPage.currentPage + 1;
        } else {
          return undefined;
        }
      },
      onError: (err) => {
        const withDetails =
          err instanceof AxiosError &&
          isInvalidResponseWithDetails(err.response?.data) &&
          err.response?.data;

        ErrorHandler.query(err, {
          notFoundError: {
            title: 'No information found',
            description: 'Try again, if the error persists, try again later',
          },
          validError: {
            title: 'Validation error',
            description:
              (withDetails && withDetails.details[0].msg) ||
              'There was a validation error caused by the server',
          },
        });
      },
    });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      void fetchNextPage();
    }
  }, [entry, fetchNextPage, hasNextPage]);

  const bookmarks = data?.pages.flatMap((page) => page.bookmarks);

  return (
    <ul ref={parent} className='flex flex-col gap-2'>
      {isSuccess &&
        (bookmarks && bookmarks.length > 0 ? (
          bookmarks.map((hist, i) => {
            if (i === bookmarks.length - 1) {
              return (
                <li key={hist.comicId} ref={ref}>
                  <Bookmark {...hist} currentUser={currentUser} />
                </li>
              );
            } else {
              return (
                <li key={hist.comicId}>
                  <Bookmark {...hist} currentUser={currentUser} />
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
      {isError && (
        <div className='col-span-2 flex h-[50vh] flex-col items-center justify-center gap-4 text-center'>
          <Icons.fatalError className='h-20 w-20 stroke-active' />
          <h3 className='text-xl font-medium md:text-3xl'>Error requesting bookmarks</h3>
          <p className='text-center text-muted-foreground'>
            Apparently something went wrong, please reload the page or click the button below
          </p>
          <Button onClick={() => void refetch()}>Try again</Button>
        </div>
      )}
    </ul>
  );
};
