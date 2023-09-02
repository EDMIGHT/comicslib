'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FC, useEffect, useRef } from 'react';

import { ComicWithChapters } from '@/components/layouts/comic-with-chapters';
import { useIntersection } from '@/hooks/use-intersection';
import { IGetAllComicsArg } from '@/services/comics.service';
import { UserService } from '@/services/users.service';
import { IResponseComic } from '@/types/comic.types';

type ComicsWithChaptersFeedProps = Omit<
  IGetAllComicsArg,
  'genres' | 'authors' | 'statuses' | 'themes'
> & {
  initialComics?: IResponseComic[];
  theme?: string[];
  genre?: string[];
  author?: string[];
  status?: string[];
  date?: string;
  startDate?: string;
  endDate?: string;
};

export const UserComicsWithChaptersFeed: FC<ComicsWithChaptersFeedProps> = ({ title }) => {
  const lastCommentRef = useRef<HTMLLIElement>(null);
  const [parent] = useAutoAnimate();

  const { ref, entry } = useIntersection({
    root: lastCommentRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, hasNextPage, isLoading, isSuccess } = useInfiniteQuery(
    ['comics', 'folders', title],
    async ({ pageParam = 1 }) => {
      return await UserService.getAllSubscribedComics({
        page: pageParam,
        title,
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

  const comics = data?.pages.flatMap((page) => page.comics);

  return (
    <ul ref={parent} className='grid auto-cols-max grid-cols-2 gap-2'>
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
