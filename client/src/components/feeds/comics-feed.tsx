'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FC, useEffect, useRef } from 'react';

import { AdvancedQuerySearchParams } from '@/components/advanced-filtering';
import { Comic } from '@/components/layouts/comic';
import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { ComicSkeletons } from '@/components/skeletons/comic-skeletons';
import { useAppSelector } from '@/hooks/redux-hooks';
import { useIntersection } from '@/hooks/use-intersection';
import { combineString } from '@/lib/utils';
import { ComicsService, IGetAllComicsArg } from '@/services/comics.service';

type IComicsProps = Omit<IGetAllComicsArg, 'genres' | 'authors' | 'statuses' | 'themes'> & {
  theme?: string[];
  genre?: string[];
  author?: string[];
  status?: string[];
  date?: string;
  startDate?: string;
  endDate?: string;
};

export const ComicsFeed: FC<IComicsProps> = ({ ...queryOptions }) => {
  const { countComicsPerPage } = useAppSelector((state) => state.settings);
  const lastCommentRef = useRef<HTMLLIElement>(null);
  const [parent] = useAutoAnimate();

  const { ref, entry } = useIntersection({
    root: lastCommentRef.current,
    threshold: 1,
  });

  const genresList = combineString(queryOptions[AdvancedQuerySearchParams.GENRE]);
  const authorsList = combineString(queryOptions[AdvancedQuerySearchParams.AUTHOR]);
  const statusesList = combineString(queryOptions[AdvancedQuerySearchParams.STATUS]);
  const themesList = combineString(queryOptions[AdvancedQuerySearchParams.THEME]);

  const { data, fetchNextPage, hasNextPage, isLoading, isSuccess, isError } = useInfiniteQuery(
    [
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
    async ({ pageParam = 1 }: { pageParam?: number }) => {
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
    {
      getNextPageParam: (lastPage) => {
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
      void fetchNextPage();
    }
  }, [entry, fetchNextPage, hasNextPage]);

  const comics = data?.pages.flatMap((page) => page.comics);

  return (
    <ul ref={parent} className='grid grid-cols-1 gap-2 lg:grid-cols-2'>
      {isSuccess &&
        (comics && comics.length > 0 ? (
          comics.map((comic, i) => {
            if (i === comics.length - 1) {
              return (
                <li key={comic.id} ref={ref}>
                  <Comic {...comic} />
                </li>
              );
            } else {
              return (
                <li key={comic.id}>
                  <Comic {...comic} />
                </li>
              );
            }
          })
        ) : (
          <div className='col-span-2 flex h-[50vh] items-center justify-center text-center'>
            <h3 className='text-3xl font-medium'>no comics found</h3>
          </div>
        ))}
      {(isLoading || isError) && <ComicSkeletons />}
    </ul>
  );
};
