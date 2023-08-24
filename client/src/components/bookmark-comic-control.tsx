'use client';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { Icons } from '@/components/ui/icons';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { IUpdateBookmarkArg, UserService } from '@/services/users.service';
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
    mutationKey: ['bookmark'],
    mutationFn: async () => {
      return await UserService.updateBookmark({
        chapterId,
        comicId,
        pageNumber,
      });
    },
    onSuccess: () => {
      router.refresh();
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return toast({
            variant: 'destructive',
            title: 'Authorization Error',
            description: 'Please login or refresh the page',
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
    <button disabled={isLoading} onClick={() => updateBookmark()}>
      <Icons.bookmark
        className={cn(
          'h-7 w-7',
          bookmark?.chapterId === chapterId &&
            bookmark.pageNumber == pageNumber &&
            'fill-foreground',
          isLoading && 'fill-muted'
        )}
      />
    </button>
  );
};
