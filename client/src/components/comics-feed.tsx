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
};

export const ComicsFeed: FC<IComicsProps> = ({ folderId }) => {
  const lastCommentRef = useRef<HTMLLIElement>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { ref, entry } = useIntersection({
    root: lastCommentRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery(
    ['comics', folderId],
    async ({ pageParam = 1 }) => {
      const { comics } = await ComicsService.getAll({
        page: pageParam,
        folderId,
      });
      return comics;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: {
        pages: [],
        pageParams: [1],
      },
    }
  );

  // useEffect(() => {
  //   queryClient.invalidateQueries({ queryKey: ['comics', folderId] });
  //   // router.refresh();
  // }, [folderId]);

  // useEffect(() => {
  //   refetch();
  // }, [folderId]);

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const comics = data?.pages.flatMap((page) => page);

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
