'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HREFS } from '@/configs/href.configs';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ChaptersService } from '@/services/chapters.service';

type ChapterControlProps = {
  comicId: string;
  currentChapterId: string;
};

export const ChapterControl: FC<ChapterControlProps> = ({ comicId, currentChapterId }) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const {
    data: content,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [REACT_QUERY_KEYS.chapters],
    queryFn: async () => {
      return await ChaptersService.getContentForComic(comicId);
    },
    onError: () => {
      toast({
        title: 'error while fetching chapters',
        description: 'try refreshing the page or try again later',
        variant: 'destructive',
      });
    },
  });

  const existedChap = content && content?.find((chap) => chap.id === currentChapterId);

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
      <PopoverContent className='z-10 w-[200px] p-2'>
        <ScrollArea className='max-h-[40vh]'>
          <ul className='flex flex-col gap-1 '>
            {content?.map((chap) => (
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
                    router.push(`${HREFS.chapter}/${chap.id}`);
                  }}
                >
                  <span className='block w-[150px] truncate'>
                    Ch. {chap.number} {chap.title ? `- ${chap.title}` : null}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {(isLoading || isError) && (
            <span>
              <Icons.loading className='mx-auto h-5 w-5 animate-spin' />
            </span>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
