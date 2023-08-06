'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ChaptersService } from '@/services/chapters.service';

import { Icons } from './icons';

type ChapterControlProps = {
  comicId: string;
  currentChapterId: string;
};

export const ChapterControl: FC<ChapterControlProps> = ({ comicId, currentChapterId }) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  // TODO infinity scroll for chapters

  const { data: response, isLoading } = useQuery({
    queryKey: ['chapters'],
    queryFn: async () => {
      return await ChaptersService.getAll({ comicId, limit: 5, order: 'asc' });
    },
    onError: () => {
      toast({
        title: 'error while fetching chapters',
        description: 'try refreshing the page or try again later',
        variant: 'destructive',
      });
    },
  });

  const existedChap = response?.chapters.find((chap) => chap.id === currentChapterId);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          <span className='block w-[150px] truncate'>
            {existedChap
              ? `Ch. ${existedChap.number} ${
                  existedChap.title ? `- ${existedChap.title}` : ''
                }`
              : 'select chapter'}
          </span>

          <Icons.chevronUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='z-10 w-[200px] px-4 py-2'>
        <ScrollArea className='max-h-[40vh]'>
          <ul className='flex flex-col gap-1'>
            {response?.chapters.map((chap) => (
              <li key={chap.id}>
                <button
                  className={cn(
                    'px-2 py-1 text-sm rounded cursor-pointer w-full text-start outline-none truncate',
                    chap.id === currentChapterId
                      ? 'bg-active text-active-foreground'
                      : 'hover:bg-secondary focus:bg-secondary'
                  )}
                  onClick={() => {
                    setOpen(false);
                    router.push(`/chapter/${chap.id}`);
                  }}
                >
                  <span className='block w-[150px] truncate'>
                    Ch. {chap.number} {chap.title ? `- ${chap.title}` : null}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {isLoading && (
            <span>
              <Icons.loading className='mx-auto h-5 w-5 animate-spin' />
            </span>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};