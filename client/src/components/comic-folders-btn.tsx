'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Command, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from '@/hooks/use-toast';
import { UserService } from '@/services/users.service';

import { Icons } from './ui/icons';

type ComicFoldersBtnProps = {
  comicId: string;
};

export const ComicFoldersBtn: FC<ComicFoldersBtnProps> = ({ comicId }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['comics-folders'],
    queryFn: async () => {
      return await UserService.getFoldersByComic(comicId);
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
  const { mutate: updateFolder, isLoading } = useMutation({
    mutationKey: ['comics-folders'],
    mutationFn: async (folderId: string) => {
      return await UserService.updateFolder(folderId, comicId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comics-folders'] });
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
            title: 'Sorry, something went wrong adding or removing a comic from a folder',
          });
        }
      }
    },
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className='flex w-[140px] gap-1 font-semibold md:gap-2'>
          <Icons.listPlus className='h-5 w-5' role='combobox' aria-expanded={open} /> Add to
          list
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-fit max-w-[220px] p-2'>
        <Command>
          <CommandEmpty>no folders found</CommandEmpty>
          <CommandGroup>
            {data?.map((folder) => (
              <CommandItem key={folder.id}>
                <label
                  htmlFor={folder.id}
                  className='flex max-w-[200px] cursor-pointer items-center gap-1 truncate px-1'
                >
                  <Checkbox
                    id={folder.id}
                    checked={folder.isComicExist}
                    disabled={isLoading}
                    onClick={() => updateFolder(folder.id)}
                  />
                  {folder.title}
                </label>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};