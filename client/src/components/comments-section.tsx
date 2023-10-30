'use client';

import { useSearchParams } from 'next/navigation';
import { FC, useCallback, useTransition } from 'react';

import { Comment } from '@/components/layouts/comment';
import { CommentSkeletons } from '@/components/skeletons/comment-skeletons';
import { Sort } from '@/components/sort';
import { Pagination } from '@/components/ui/pagination';
import { SORT_VARIANTS } from '@/configs/site.configs';
import { useChangeSearchParams } from '@/hooks/use-change-search-params';
import { ICommentVoteType, IResponseAllComments } from '@/types/comment.types';

type CommentsListProps = IResponseAllComments & {
  convertedUserCommentsVotes: Record<string, ICommentVoteType | null>;
};

export const CommentsSection: FC<CommentsListProps> = ({
  comments,
  currentPage,
  totalPages,
  convertedUserCommentsVotes,
}) => {
  const searchParams = useSearchParams()!;
  const [changeSearchParams] = useChangeSearchParams();
  const [isPending, startTransition] = useTransition();

  const createPaginationQueryString = useCallback(
    (name: string, value: string | number) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const params = new URLSearchParams(searchParams);
      params.set(name, value.toString());

      return params.toString();
    },
    [searchParams]
  );
  const createSortQueryString = useCallback(
    (field: string, order: string) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const params = new URLSearchParams(searchParams);
      params.set('sort', field);
      params.set('order', order);

      return params.toString();
    },
    [searchParams]
  );

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  if (comments.length > 0) {
    return (
      <>
        <Sort
          initialSort={sort}
          initialOrder={order}
          variants={SORT_VARIANTS.comments}
          contentWidth='230px'
          className='w-[230px]'
          styleVariant='transparent'
          disabled={isPending}
          customHandler={({ field, order }) =>
            startTransition(() => {
              changeSearchParams(createSortQueryString(field, order));
            })
          }
        />
        <ul className='flex flex-col gap-1'>
          {!isPending ? (
            comments.map((com) => (
              <li key={com.id}>
                <Comment {...com} userVotes={convertedUserCommentsVotes} />
              </li>
            ))
          ) : (
            <CommentSkeletons />
          )}
        </ul>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            className='justify-center'
            customHandlePageChange={(newPage) =>
              startTransition(() => {
                changeSearchParams(createPaginationQueryString('page', newPage));
              })
            }
          />
        )}
      </>
    );
  }
};
