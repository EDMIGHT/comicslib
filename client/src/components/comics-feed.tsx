'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FC, useEffect, useRef } from 'react';

import { Comic } from '@/components/layouts/comic';
import { useIntersection } from '@/hooks/use-intersection';
import { combineString } from '@/lib/helpers/combine-string.helper';
import { ComicsService, IGetAllComicsArg } from '@/services/comics.service';
import { IResponseComic } from '@/types/comic.types';

import { AdvancedQuerySearchParams } from './advanced-filtering';
import { ComicSkeletons } from './skeletons/comic-skeletons';

type IComicsProps = Omit<IGetAllComicsArg, 'genres' | 'authors' | 'statuses'> & {
  initialComics?: IResponseComic[];
  genre?: string[];
  author?: string[];
  status?: string[];
};

export const ComicsFeed: FC<IComicsProps> = ({ initialComics, ...queryOptions }) => {
  const lastCommentRef = useRef<HTMLLIElement>(null);
  const [parent] = useAutoAnimate();

  const { ref, entry } = useIntersection({
    root: lastCommentRef.current,
    threshold: 1,
  });

  const genresList = combineString(queryOptions[AdvancedQuerySearchParams.GENRE]);
  const authorsList = combineString(queryOptions[AdvancedQuerySearchParams.AUTHOR]);
  const statusesList = combineString(queryOptions[AdvancedQuerySearchParams.STATUS]);

  const { data, fetchNextPage, hasNextPage, isLoading, isSuccess } = useInfiniteQuery(
    [
      'comics',
      queryOptions.folderId,
      queryOptions.title,
      queryOptions.sort,
      queryOptions.order,
      genresList,
      authorsList,
      statusesList,
    ],
    async ({ pageParam = initialComics ? 2 : 1 }) => {
      return await ComicsService.getAll({
        page: pageParam,
        ...queryOptions,
        genres: genresList,
        authors: authorsList,
        statuses: statusesList,
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

  const comics = data?.pages.flatMap((page) => page.comics) ?? initialComics;

  return (
    <ul ref={parent} className='grid auto-cols-max grid-cols-2 gap-2'>
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
      {isLoading && <ComicSkeletons />}
    </ul>
  );
};
