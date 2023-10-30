'use client';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { Icons } from '@/components/ui/icons';
import { ErrorHandler } from '@/lib/helpers/error-handler.helper';
import { cn } from '@/lib/utils';
import { IUpdateBookmarkArg, UsersService } from '@/services/users.service';
import { isInvalidResponseWithDetails } from '@/types/response.types';
import { IBookmark } from '@/types/user.types';

type BookmarkComicControlProps = IUpdateBookmarkArg & {
  bookmark: IBookmark | undefined;
};

export const BookmarkComicControl: FC<BookmarkComicControlProps> = ({
  chapterId,
  comicId,
  pageNumber,
  bookmark,
}) => {
  const router = useRouter();

  const { mutate: updateBookmark, isLoading } = useMutation({
    mutationKey: [REACT_QUERY_KEYS.bookmarks],
    mutationFn: async () => {
      return await UsersService.updateBookmark({
        chapterId,
        comicId,
        pageNumber,
      });
    },
    onSuccess: () => {
      router.refresh();
    },
    onError: (err) => {
      const withDetails =
        err instanceof AxiosError &&
        isInvalidResponseWithDetails(err.response?.data) &&
        err.response?.data;

      ErrorHandler.mutation(err, {
        notFoundError: {
          title: 'Not found',
          description:
            (withDetails && withDetails.details[0].msg) ||
            'The page or chapter you are trying to bookmark no longer exists.',
        },
        conflictError: {
          title: 'You are not the owner of this bookmark',
          description: 'You are trying to edit a bookmark that you are not the owner of',
        },
      });
    },
  });

  return !isLoading ? (
    <button disabled={isLoading} onClick={() => updateBookmark()}>
      <Icons.bookmark
        className={cn(
          'h-7 w-7 transition-colors',
          bookmark?.chapterId === chapterId &&
            bookmark.pageNumber == pageNumber &&
            'fill-foreground'
        )}
      />
    </button>
  ) : (
    <Icons.loading className='h-7 w-7 animate-spin' />
  );
};
