'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FC, useEffect, useRef } from 'react';

import { ComicWithChapters } from '@/components/layouts/comic-with-chapters';
import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { ComicWithChaptersSkeletons } from '@/components/skeletons/comic-with-chapters-skeletons';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useAppSelector } from '@/hooks/redux-hooks';
import { useIntersection } from '@/hooks/use-intersection';
import { ErrorHandler } from '@/lib/helpers/error-handler.helper';
import { ComicsService, IGetAllComicsWithChaptersArg } from '@/services/comics.service';
import { UsersService } from '@/services/users.service';
import { isInvalidResponseWithDetails } from '@/types/response.types';

type ComicsWithChaptersFeedProps = Omit<IGetAllComicsWithChaptersArg, 'page' | 'limit'> &
  (
    | {
        fetchQuery?: 'all' | 'for-user';
      }
    | {
        fetchQuery: 'uploaded-by-user';
        login: string;
      }
  );

export const ComicsWithChaptersFeed: FC<ComicsWithChaptersFeedProps> = (props) => {
  const { title, sort, order, fetchQuery = 'all' } = props;

  const { countComicsPerPage } = useAppSelector((state) => state.settings);
  const lastCommentRef = useRef<HTMLLIElement>(null);
  const [parent] = useAutoAnimate();

  const { ref, entry } = useIntersection({
    root: lastCommentRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, hasNextPage, refetch, isLoading, isSuccess, isError } =
    useInfiniteQuery({
      queryKey: [REACT_QUERY_KEYS.comics, countComicsPerPage, title, sort, order],
      queryFn: async ({ pageParam = 1 }: { pageParam?: number }) => {
        switch (fetchQuery) {
          case 'for-user': {
            return await UsersService.getAllSubscribedComics({
              page: pageParam,
              limit: countComicsPerPage,
              title,
              sort,
              order,
            });
          }
          case 'uploaded-by-user': {
            const { login } = props as { login: string };
            return await UsersService.getAllUploadedComics({
              login,
              page: pageParam,
              limit: countComicsPerPage,
              title,
              sort,
              order,
            });
          }
          default: {
            return await ComicsService.getAllWithChapters({
              page: pageParam,
              limit: countComicsPerPage,
              title,
              sort,
              order,
            });
          }
        }
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

  const comics = data?.pages.flatMap((page) => page.comics);

  return (
    <ul ref={parent} className='grid grid-cols-1 gap-2'>
      {isSuccess &&
        (comics && comics.length > 0 ? (
          comics.map((comic, i) => {
            if (i === comics.length - 1) {
              return (
                <li key={comic.id} ref={ref}>
                  <ComicWithChapters {...comic} />
                </li>
              );
            } else {
              return (
                <li key={comic.id}>
                  <ComicWithChapters {...comic} />
                </li>
              );
            }
          })
        ) : (
          <div className='col-span-2 flex h-[50vh] items-center justify-center text-center'>
            <h3 className='text-3xl font-medium'>comics not found</h3>
          </div>
        ))}
      {isLoading && <ComicWithChaptersSkeletons />}
      {isError && (
        <div className='col-span-2 flex h-[50vh] flex-col items-center justify-center gap-4 text-center'>
          <Icons.fatalError className='h-20 w-20 stroke-active' />
          <h3 className='text-xl font-medium md:text-3xl'>
            Error requesting comics with chapters
          </h3>
          <p className='text-center text-muted-foreground'>
            Apparently something went wrong, please reload the page or click the button below
          </p>
          <Button onClick={() => void refetch()}>Try again</Button>
        </div>
      )}
    </ul>
  );
};
