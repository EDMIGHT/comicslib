'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { Button, buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Icons } from '@/components/ui/icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HREFS } from '@/configs/href.configs';
import { ErrorHandler } from '@/lib/helpers/error-handler.helper';
import { cn } from '@/lib/utils';
import { FoldersService } from '@/services/folders.service';

type ComicFoldersBtnProps = {
  comicId: string;
};

export const ComicFoldersBtn: FC<ComicFoldersBtnProps> = ({ comicId }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const queryClient = useQueryClient();

  const {
    data: folders,
    isSuccess: isFetchFoldersSuccess,
    refetch: foldersRefetch,
    isError: isFetchFoldersError,
  } = useQuery({
    queryKey: [REACT_QUERY_KEYS.folders],
    queryFn: async () => {
      return await FoldersService.getFoldersByComic(comicId);
    },
    onError: (err) => {
      ErrorHandler.query(err);
    },
  });
  const { mutate: updateFolder, isLoading } = useMutation({
    mutationKey: [REACT_QUERY_KEYS.folders],
    mutationFn: async (folderId: string) => {
      return await FoldersService.updateExistenceComicInFolder(folderId, comicId);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.folders] });
      router.refresh();
    },
    onError: (err) => {
      ErrorHandler.mutation(err, {
        notFoundError: {
          title: 'Data does not exist',
          description:
            'Perhaps the folder or comic no longer exists on the site, please refresh the page',
        },
        conflictError: {
          title: 'Access error',
          description: 'You are trying to change a folder that you are not the owner of',
        },
      });
    },
  });

  const isExistAtLeastOneFolder = folders && folders.length > 0;
  const isMoreThan5Folders = folders && folders.length > 5;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role='combobox'
          aria-expanded={open}
          className='flex w-[140px] gap-1 font-semibold md:gap-2'
        >
          <Icons.listPlus className='h-5 w-5' /> Add to list
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        {isExistAtLeastOneFolder ? (
          isFetchFoldersSuccess &&
          folders && (
            <ScrollArea className='flex max-h-[20vh] flex-col p-1' type='always'>
              <Command
                filter={(currentFolderId, searchText) => {
                  // ? if there were no limit, then most likely the best option would be to create a store of filtered values,
                  // so as not to go through the entire array every time, but in this case this is overkill
                  const desiredFolders = folders.filter((folder) =>
                    folder.title.toLowerCase().startsWith(searchText.toLowerCase())
                  );
                  return desiredFolders.find((folder) => folder.id === currentFolderId)
                    ? 1
                    : 0;
                }}
              >
                {isMoreThan5Folders && (
                  <CommandInput placeholder='Search folder...' className='h-9' />
                )}
                <CommandEmpty>No folders found</CommandEmpty>
                <CommandGroup>
                  {folders.map(({ id, isComicExist, title }) => (
                    <CommandItem key={id} value={id}>
                      <label
                        htmlFor={id}
                        className='line-clamp-1 flex w-full cursor-pointer items-center gap-1 break-words px-1'
                      >
                        <Checkbox
                          id={id}
                          checked={isComicExist}
                          disabled={isLoading}
                          onClick={() => updateFolder(id)}
                        />
                        {title}
                      </label>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </ScrollArea>
          )
        ) : (
          <h4>
            <Link
              href={HREFS.create.folder}
              className={cn(buttonVariants({ variant: 'link' }), 'h-fit text-center')}
            >
              You don&apos;t have folders, but you can create them
            </Link>
          </h4>
        )}
        {isFetchFoldersError && (
          <Button onClick={() => void foldersRefetch()} className='w-full' variant='ghost'>
            Try again
          </Button>
        )}
        {isLoading && <Icons.loading className='mx-auto h-5 w-5 animate-spin' />}
      </PopoverContent>
    </Popover>
  );
};
