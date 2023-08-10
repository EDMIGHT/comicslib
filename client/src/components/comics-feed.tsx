'use client';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useRef } from 'react';

import { useIntersection } from '@/hooks/use-intersection';
import { ComicsService } from '@/services/comics.service';
import { IResponseComic } from '@/types/comic.types';

import { Comic } from './layouts/comic';

type IComicsProps = {
  folderId?: string;
  ratedUser?: string;
  initialComics?: IResponseComic[];
};

export const ComicsFeed: FC<IComicsProps> = ({ folderId, ratedUser, initialComics }) => {
  const lastCommentRef = useRef<HTMLLIElement>(null);

  const { ref, entry } = useIntersection({
    root: lastCommentRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['comics', folderId],
    async ({ pageParam = initialComics ? 2 : 1 }) => {
      const { comics } = await ComicsService.getAll({
        page: pageParam,
        folderId,
        ratedUser,
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
    <ul className='grid auto-cols-max grid-cols-2 gap-2'>
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
