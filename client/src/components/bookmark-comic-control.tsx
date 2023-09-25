'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { Icons } from '@/components/ui/icons';
import { handleErrorMutation } from '@/lib/helpers/handleErrorMutation';
import { cn } from '@/lib/utils';
import { IUpdateBookmarkArg, UsersService } from '@/services/users.service';
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
      handleErrorMutation(err);
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
