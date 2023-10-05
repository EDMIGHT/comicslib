'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FC, useEffect, useRef } from 'react';

import { ComicWithChapters } from '@/components/layouts/comic-with-chapters';
import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { ComicWithChaptersSkeletons } from '@/components/skeletons/comic-with-chapters-skeletons';
import { useAppSelector } from '@/hooks/redux-hooks';
import { useIntersection } from '@/hooks/use-intersection';
import { IGetAllUploadsArg, UsersService } from '@/services/users.service';

type ComicsWithChaptersFeedProps = Omit<IGetAllUploadsArg, 'page' | 'limit' | 'login'>;

export const UserComicsWithChaptersFeed: FC<ComicsWithChaptersFeedProps> = ({
  title,
  sort,
  order,
}) => {
  const { countComicsPerPage } = useAppSelector((state) => state.settings);
  const lastCommentRef = useRef<HTMLLIElement>(null);
  const [parent] = useAutoAnimate();

  const { ref, entry } = useIntersection({
    root: lastCommentRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, hasNextPage, isLoading, isSuccess, isError } = useInfiniteQuery(
    [
      REACT_QUERY_KEYS.comics,
      REACT_QUERY_KEYS.folders,
      countComicsPerPage,
      title,
      sort,
      order,
    ],
    async ({ pageParam = 1 }: { pageParam?: number }) => {
      return await UsersService.getAllSubscribedComics({
        page: pageParam,
        limit: countComicsPerPage,
        title,
        sort,
        order,
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
      {(isLoading || isError) && <ComicWithChaptersSkeletons />}
    </ul>
  );
};
