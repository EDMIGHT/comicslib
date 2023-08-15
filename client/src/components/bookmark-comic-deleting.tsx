'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FC } from 'react';

import { Icons } from '@/components/ui/icons';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { UserService } from '@/services/users.service';

type BookmarkComicDeleteProps = {
  comicId: string;
};

export const BookmarkComicDelete: FC<BookmarkComicDeleteProps> = ({ comicId }) => {
  const queryClient = useQueryClient();

  const { mutate: deleteBookmark, isLoading } = useMutation({
    mutationKey: ['bookmarks'],
    mutationFn: async () => {
      return await UserService.deleteBookmark(comicId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return toast({
            variant: 'destructive',
            title: 'Authorization Error',
            description: 'Please login or refresh the page',
          });
        } else if (err.response?.status === 404) {
          toast({
            variant: 'destructive',
            title: err.response.data.message,
          });
        } else if (err.response?.status === 409) {
          toast({
            variant: 'destructive',
            title: 'You are not the owner of this bookmark',
            description:
              'You cannot delete other peoples bookmarks, if this is an error, then try reloading the page',
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'Sorry, something went wrong while retrieving your folders',
          });
        }
      }
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
