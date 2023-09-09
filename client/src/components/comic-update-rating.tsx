'use client';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { COMIC_RATING_CONFIG } from '@/configs/comic.configs';
import { toast } from '@/hooks/use-toast';
import { arrayFromRange, cn } from '@/lib/utils';
import { ComicsService } from '@/services/comics.service';
import { IRating } from '@/types/review.types';

type ComicUpdateRatingProps = {
  comicId: string;
  rating: IRating | null;
};

export const ComicUpdateRating: FC<ComicUpdateRatingProps> = ({ comicId, rating }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const isExistRating = !!rating;
  const ratingsValue = arrayFromRange(COMIC_RATING_CONFIG.min, COMIC_RATING_CONFIG.max);

  const { mutate: updateRating, isLoading } = useMutation({
    mutationKey: [REACT_QUERY_KEYS.rating],
    mutationFn: async (value: number) => {
      return await ComicsService.updateRating(comicId, value);
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
            title: "Sorry, something went wrong while updating the comic's rating",
            description: 'Please try again later',
          });
        }
      }
    },
    onMutate: () => {
      setOpen(false);
    },
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          isLoading={isLoading}
          className={cn(
            'px-3 h-full',
            isExistRating &&
              'bg-active text-active-foreground flex gap-1 items-center hover:bg-active hover:opacity-80 focus:opacity-80'
          )}
        >
          {isExistRating && `${rating.value}`}
          <Icons.star
            className={cn(
              'h-5 w-5',
              isExistRating ? 'fill-active-foreground' : 'fill-primary-foreground'
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[65px] bg-card p-0 text-card-foreground'>
        <ul className='flex flex-col  gap-1'>
          {ratingsValue.map((v) => (
            <li key={v}>
              <button
                onClick={() => updateRating(v)}
                className={cn(
                  'px-2 py-1 text-sm rounded cursor-pointer w-full outline-none text-center',
                  v === rating?.value
                    ? 'bg-active text-active-foreground'
                    : 'hover:bg-secondary focus:bg-secondary'
                )}
              >
                {v}
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
