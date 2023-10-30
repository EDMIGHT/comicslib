'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FC, useEffect, useRef } from 'react';

import { AdvancedQuerySearchParams } from '@/components/advanced-filtering';
import { Comic } from '@/components/layouts/comic';
import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { ComicSkeletons } from '@/components/skeletons/comic-skeletons';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useAppSelector } from '@/hooks/redux-hooks';
import { useIntersection } from '@/hooks/use-intersection';
import { ErrorHandler } from '@/lib/helpers/error-handler.helper';
import { cn, combineString } from '@/lib/utils';
import { ComicsService, IGetAllComicsArg } from '@/services/comics.service';
import { isInvalidResponseWithDetails } from '@/types/response.types';

type IComicsProps = Omit<IGetAllComicsArg, 'genres' | 'authors' | 'statuses' | 'themes'> & {
  theme?: string[];
  genre?: string[];
  author?: string[];
  status?: string[];
  date?: string;
  startDate?: string;
  endDate?: string;
  className?: string;
};

export const ComicsFeed: FC<IComicsProps> = ({ className, ...queryOptions }) => {
  const { countComicsPerPage } = useAppSelector((state) => state.settings);
  const lastCommentRef = useRef<HTMLLIElement>(null);
  const [parent] = useAutoAnimate();

  const { ref, entry } = useIntersection({
    root: lastCommentRef.current,
    threshold: 0.7,
  });

  const genresList = combineString(queryOptions[AdvancedQuerySearchParams.GENRE]);
  const authorsList = combineString(queryOptions[AdvancedQuerySearchParams.AUTHOR]);
  const statusesList = combineString(queryOptions[AdvancedQuerySearchParams.STATUS]);
  const themesList = combineString(queryOptions[AdvancedQuerySearchParams.THEME]);

  const { data, fetchNextPage, hasNextPage, refetch, isLoading, isSuccess, isError } =
    useInfiniteQuery({
      queryKey: [
        REACT_QUERY_KEYS.comics,
        queryOptions.folderId,
        queryOptions.title,
        queryOptions.sort,
        queryOptions.order,
        queryOptions.date,
        queryOptions.startDate,
        queryOptions.endDate,
        queryOptions.theme,
        genresList,
        authorsList,
        statusesList,
        countComicsPerPage,
      ],
      queryFn: async ({ pageParam = 1 }: { pageParam?: number }) => {
        return await ComicsService.getAll({
          page: pageParam,
          limit: countComicsPerPage,
          ...queryOptions,
          genres: genresList,
          authors: authorsList,
          statuses: statusesList,
          themes: themesList,
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
    <ul ref={parent} className={cn('grid grid-cols-1 gap-2 lg:grid-cols-2', className)}>
      {isSuccess &&
        (comics && comics.length > 0 ? (
          comics.map((comic, i) => {
            if (i === comics.length - 1) {
              return (
                <li key={comic.id} ref={ref}>
                  <Comic {...comic} className='h-full' />
                </li>
              );
            } else {
              return (
                <li key={comic.id}>
                  <Comic {...comic} className='h-full' />
                </li>
              );
            }
          })
        ) : (
          <div className='col-span-2 flex h-[50vh] items-center justify-center text-center'>
            <h3 className='text-2xl font-medium xl:text-3xl'>no comics found</h3>
          </div>
        ))}
      {isLoading && <ComicSkeletons />}
      {isError && (
        <div className='col-span-2 flex h-[50vh] flex-col items-center justify-center gap-4 text-center'>
          <Icons.fatalError className='h-20 w-20 stroke-active' />
          <h3 className='text-xl font-medium md:text-3xl'>Error requesting comics</h3>
          <p className='text-center text-muted-foreground'>
            Apparently something went wrong, please reload the page or click the button below
          </p>
          <Button onClick={() => void refetch()}>Try again</Button>
        </div>
      )}
    </ul>
  );
};
