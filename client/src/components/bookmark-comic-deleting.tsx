'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';

import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { Icons } from '@/components/ui/icons';
import { handleErrorMutation } from '@/lib/helpers/handleErrorMutation';
import { cn } from '@/lib/utils';
import { UserService } from '@/services/users.service';

type BookmarkComicDeleteProps = {
  comicId: string;
};

export const BookmarkComicDelete: FC<BookmarkComicDeleteProps> = ({ comicId }) => {
  const queryClient = useQueryClient();

  const { mutate: deleteBookmark, isLoading } = useMutation({
    mutationKey: [REACT_QUERY_KEYS.bookmarks],
    mutationFn: async () => {
      return await UserService.deleteBookmark(comicId);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.bookmarks] });
    },
    onError: (err) => {
      handleErrorMutation(err, {
        conflictError: {
          title: 'You are not the owner of this bookmark',
          description:
            'You cannot delete other peoples bookmarks, if this is an error, then try reloading the page',
        },
      });
    },
  });
  return (
    <button
      disabled={isLoading}
      onClick={() => deleteBookmark()}
      className='self-end justify-self-end'
    >
      <Icons.delete
        className={cn('h-5 w-5 ', isLoading ? 'stroke-muted' : 'hover:stroke-destructive')}
      />
    </button>
  );
};
