'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FC, useEffect, useRef } from 'react';

import { ComicWithChapters } from '@/components/layouts/comic-with-chapters';
import { useIntersection } from '@/hooks/use-intersection';
import { IGetAllUploadsArg, UsersService } from '@/services/users.service';

type UserUploadsFeedProps = Omit<IGetAllUploadsArg, 'page' | 'limit'>;

export const UserUploadsFeed: FC<UserUploadsFeedProps> = ({ login, title, sort, order }) => {
  const lastCommentRef = useRef<HTMLLIElement>(null);
  const [parent] = useAutoAnimate();

  const { ref, entry } = useIntersection({
    root: lastCommentRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, hasNextPage, isLoading, isSuccess } = useInfiniteQuery(
    ['comics', 'folders', title, sort, order],
    async ({ pageParam = 1 }: { pageParam?: number }) => {
      return await UsersService.getAllUploadedComics({
        login,
        page: pageParam,
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
    <ul ref={parent} className='grid gap-2'>
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
      {/* {isLoading && <ComicSkeletons />} */}
    </ul>
  );
};
