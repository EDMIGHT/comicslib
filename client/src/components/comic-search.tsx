'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CommandDialog, CommandInput } from '@/components/ui/command';
import { Icons } from '@/components/ui/icons';
import { Skeleton } from '@/components/ui/skeleton';
import { useDebounce } from '@/hooks/use-debounce';
import { toast } from '@/hooks/use-toast';
import { isMacOS } from '@/lib/helpers/general.helper';
import { ComicsService } from '@/services/comics.service';

import { ComicCounters } from './comic-counters';

type ComicSearchProps = {};

export const ComicSearch: FC<ComicSearchProps> = ({}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [debounced] = useDebounce(value, 500);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    if (!open) {
      setValue('');
    }
  }, [open]);

  const {
    data: searchedComics,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['search-comics', debounced],
    queryFn: async () => {
      if (debounced) {
        const data = await ComicsService.getAll({
          limit: 5,
          title: debounced,
        });
        return data;
      }
      return null;
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Oops, something went wrong',
        description: 'An error occurred while searching, please try again later',
      });
    },
  });

  return (
    <>
      <Button
        variant='outline'
        className='relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2'
        onClick={() => setOpen(true)}
      >
        <Icons.search className='h-4 w-4 xl:mr-2' aria-hidden='true' />
        <span className='hidden xl:inline-flex'>search comics...</span>
        <kbd className='pointer-events-none absolute right-1 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex'>
          <abbr title={isMacOS() ? 'Command' : 'Control'}>{isMacOS() ? '⌘' : 'Ctrl'} K</abbr>
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder='search comic by title..'
          value={value}
          onValueChange={setValue}
        />
        {isLoading && (
          <ul className='flex flex-col gap-1 p-1'>
            <li className='flex w-full gap-2 rounded p-1'>
              <Skeleton className='h-[90px] w-[60px] rounded' />
              <div className='flex flex-col justify-center gap-1'>
                <Skeleton className='h-5 w-[250px]' />
                <Skeleton className='h-5 w-[150px]' />
                <Skeleton className='h-5 w-[100px]' />
              </div>
            </li>
            <li className='flex w-full gap-2 rounded p-1'>
              <Skeleton className='h-[90px] w-[60px] rounded' />
              <div className='flex flex-col justify-center gap-1'>
                <Skeleton className='h-5 w-[250px]' />
                <Skeleton className='h-5 w-[150px]' />
                <Skeleton className='h-5 w-[100px]' />
              </div>
            </li>
            <li className='flex w-full gap-2 rounded p-1'>
              <Skeleton className='h-[90px] w-[60px] rounded' />
              <div className='flex flex-col justify-center gap-1'>
                <Skeleton className='h-5 w-[250px]' />
                <Skeleton className='h-5 w-[150px]' />
                <Skeleton className='h-5 w-[100px]' />
              </div>
            </li>
          </ul>
        )}
        {isSuccess &&
          searchedComics &&
          (searchedComics?.comics?.length > 0 ? (
            <ul className='flex flex-col gap-1 p-1'>
              {searchedComics?.comics.map((comic) => (
                <li key={comic.id}>
                  <Link
                    href={`/comics/${comic.id}`}
                    className='flex gap-2 rounded p-1 transition-colors hover:bg-secondary/75'
                  >
                    <div className='relative h-[90px] w-[60px] overflow-hidden rounded object-cover'>
                      <Image src={comic.img} alt={comic.title} fill />
                    </div>
                    <div className='flex flex-col justify-center gap-1'>
                      <h3 className='text-xl'>{comic.title}</h3>

                      <ComicCounters _count={comic._count} avgRating={comic.avgRating} />
                      <Badge className='w-fit'>{comic.status.name}</Badge>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className='p-10 text-center '>
              <h2>comics not found</h2>
            </div>
          ))}
      </CommandDialog>
    </>
  );
};
