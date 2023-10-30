'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { FC, useState } from 'react';

import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HREFS } from '@/configs/href.configs';
import { ErrorHandler } from '@/lib/helpers/error-handler.helper';
import { cn } from '@/lib/utils';
import { ChaptersService } from '@/services/chapters.service';

type ChapterControlProps = {
  comicId: string;
  currentChapterId: string;
};

export const ChapterControl: FC<ChapterControlProps> = ({ comicId, currentChapterId }) => {
  const [open, setOpen] = useState(false);

  const {
    data: content,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useQuery({
    queryKey: [REACT_QUERY_KEYS.chapters],
    queryFn: async () => {
      return await ChaptersService.getContentForComic(comicId);
    },
    onError: (err) => {
      ErrorHandler.query(err);
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
          className='w-fit justify-between md:w-[200px]'
        >
          <span className='mr-2 hidden w-[150px] truncate md:block'>
            {existedChap
              ? `Ch. ${existedChap.number} ${
                  existedChap.title ? `- ${existedChap.title}` : ''
                }`
              : 'select chapter'}
          </span>

          <Icons.chevronUpDown className='h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='z-10 w-[200px] p-2'>
        {isSuccess && (
          <ScrollArea className='flex max-h-[40vh] flex-col' type='always'>
            <ul className='flex flex-col gap-1'>
              {content?.map((chap) => (
                <li key={chap.id}>
                  <Link
                    href={`${HREFS.chapter}/${chap.id}`}
                    className={cn(
                      'px-2 py-1 text-sm rounded cursor-pointer w-full text-start outline-none truncate block',
                      chap.id === currentChapterId
                        ? 'bg-active text-active-foreground'
                        : 'hover:bg-secondary focus:bg-secondary'
                    )}
                  >
                    <span className='block w-[150px] truncate'>
                      Ch. {chap.number} {chap.title ? `- ${chap.title}` : null}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollArea>
        )}
        {isError && (
          <Button onClick={() => void refetch()} className='w-full' variant='ghost'>
            Try again
          </Button>
        )}
        {isLoading && <Icons.loading className='mx-auto h-5 w-5 animate-spin' />}
      </PopoverContent>
    </Popover>
  );
};
