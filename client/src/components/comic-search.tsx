'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Icons } from '@/components/ui/icons';
import { useDebounce } from '@/hooks/use-debounce';
import { toast } from '@/hooks/use-toast';
// import { isMacOS } from '@/lib/helpers/general.helper';
import { ComicsService } from '@/services/comics.service';

import { ComicCounters } from './comic-counters';
import { Badge } from './ui/badge';

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

  const { data: searchedComics, isLoading } = useQuery({
    queryKey: ['comics', debounced],
    queryFn: async () => {
      const data = await ComicsService.getAll({
        limit: 5,
        title: debounced,
      });
      return data.comics;
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
          {/* <abbr title={isMacOS() ? 'Command' : 'Control'}>{isMacOS() ? '⌘' : 'Ctrl'} K</abbr> */}
          <abbr title={'Control'}>{'Ctrl'} K</abbr>
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder='search comic by title..'
          value={value}
          onValueChange={setValue}
        />
        <ul className='flex flex-col gap-1 p-2'>
          {searchedComics?.map((comic) => (
            <li key={comic.id} className='flex gap-2'>
              <div className='relative h-[86px] w-[58px] overflow-hidden rounded object-cover'>
                <Image src={comic.img} alt={comic.title} fill />
              </div>
              <div className='flex flex-col gap-1'>
                <h3 className='text-xl'>{comic.title}</h3>

                <ComicCounters _count={comic._count} avgRating={comic.avgRating} />
                <Badge className='w-fit'>{comic.status.name}</Badge>
              </div>
            </li>
          ))}
        </ul>
      </CommandDialog>
    </>
  );
};
