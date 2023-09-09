'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';

import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { Button } from '@/components/ui/button';
import { CommandDialog } from '@/components/ui/command';
import { Icons } from '@/components/ui/icons';
import { toast } from '@/hooks/use-toast';
import { UsersService } from '@/services/users.service';

export const BookmarksCleaning = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { mutate: cleaningBookmarks, isLoading } = useMutation({
    mutationKey: [REACT_QUERY_KEYS.bookmarks],
    mutationFn: async () => {
      return await UsersService.cleaningBookmarks();
    },
    onSuccess: (data) => {
      toast({
        title: 'Successfully',
        description: `${data.count} bookmarks have been deleted`,
      });
      void queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.bookmarks] });
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
            title: 'Sorry, something went wrong while clearing your bookmarks',
          });
        }
      }
    },
  });

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant='secondary'
        className='flex w-fit gap-1'
        isLoading={isLoading}
      >
        <Icons.cleaning /> clear all
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className='flex flex-col gap-3 p-6'>
          <h1 className='text-lg font-semibold'>Are you sure you want to do this?</h1>
          <p className='text-sm text-muted-foreground'>
            If you confirm this action, then we will not be able to restore your bookmarks if
            you decide to return them
          </p>
          <div className='flex justify-end gap-2'>
            <Button onClick={() => setOpen(false)} variant='outline'>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                cleaningBookmarks();
              }}
            >
              Continue
            </Button>
          </div>
        </div>
      </CommandDialog>
    </>
  );
};
