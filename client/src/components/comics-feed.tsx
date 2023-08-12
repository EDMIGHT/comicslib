'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FC, useEffect, useRef } from 'react';

import { Comic } from '@/components/layouts/comic';
import { useIntersection } from '@/hooks/use-intersection';
import { ComicsService, IGetAllComicsArg } from '@/services/comics.service';
import { IResponseComic } from '@/types/comic.types';

type IComicsProps = IGetAllComicsArg & {
  initialComics?: IResponseComic[];
};

export const ComicsFeed: FC<IComicsProps> = ({ initialComics, ...queryOptions }) => {
  const lastCommentRef = useRef<HTMLLIElement>(null);
  const [parent] = useAutoAnimate();

  const { ref, entry } = useIntersection({
    root: lastCommentRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    [
      'comics',
      queryOptions.folderId,
      queryOptions.title,
      queryOptions.sort,
      queryOptions.order,
    ],
    async ({ pageParam = initialComics ? 2 : 1 }) => {
      const { comics } = await ComicsService.getAll({
        page: pageParam,
        ...queryOptions,
      });
      return comics;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: {
        pages: initialComics ? [initialComics] : [],
        pageParams: [1],
      },
    }
  );

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const comics = data?.pages.flatMap((page) => page) ?? initialComics;

  return (
    <ul ref={parent} className='grid auto-cols-max grid-cols-2 gap-2'>
      {comics?.map((comic, i) => {
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
      })}
    </ul>
  );
};
