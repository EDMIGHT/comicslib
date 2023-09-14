'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { FC, useEffect, useRef } from 'react';

import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { useIntersection } from '@/hooks/use-intersection';
import { CommentsService } from '@/services/comments.service';
import { IResponseComment } from '@/types/comment.types';

import { Comment } from '../layouts/comment';
import { Icons } from '../ui/icons';

type CommentFeedProps = {
  initialComments: IResponseComment[];
  comicId: string;
};

// TODO найти причину почему не обновляются данные при создании нового комментария
// ? при router.refresh() обновляется время на постах, но не добавляется новый

export const CommentFeed: FC<CommentFeedProps> = ({ comicId, initialComments }) => {
  const lastCommentRef = useRef<HTMLLIElement>(null);

  const { ref, entry } = useIntersection({
    root: lastCommentRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    [REACT_QUERY_KEYS.comments],
    async ({ pageParam = 0 }: { pageParam?: number }) => {
      const { comments } = await CommentsService.getAll({
        comicId,
        page: pageParam,
      });
      return comments;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: {
        pages: [initialComments],
        pageParams: [1],
      },
    }
  );

  useEffect(() => {
    if (entry?.isIntersecting) {
      void fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const comments = data?.pages.flatMap((page) => page) ?? initialComments;

  return (
    <>
      <ul className='flex flex-col gap-1'>
        {comments.map((com, i) => {
          if (i === comments.length - 1) {
            return (
              <li key={com.id} ref={ref}>
                <Comment {...com} />
              </li>
            );
          } else {
            return (
              <li key={com.id}>
                <Comment {...com} />
              </li>
            );
          }
        })}
      </ul>
      {isFetchingNextPage && (
        <div>
          <Icons.loading className='mx-auto animate-spin' />
        </div>
      )}
    </>
  );
};
