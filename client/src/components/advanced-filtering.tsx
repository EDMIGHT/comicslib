'use client';

import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useClickOutside } from '@/hooks/use-click-outside';
import { useDebounce } from '@/hooks/use-debounce';
import { cn } from '@/lib/utils';
import { AuthorsService } from '@/services/authors.service';
import { IGenre } from '@/types/genre.types';
import { IStatus } from '@/types/status.types';

type AdvancedFilteringProps = {
  genres: IGenre[];
  statuses: IStatus[];
};

export const AdvancedFiltering: FC<AdvancedFilteringProps> = ({ genres, statuses }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [debounced] = useDebounce(value, 500);

  const handlerRefPopup = useClickOutside(() => setOpen(false));

  const {
    data: authors,
    isLoading: isLoadingAuthors,
    isSuccess: isSuccessAuthors,
  } = useQuery({
    queryKey: ['authors', debounced],
    queryFn: async () => {
      if (debounced) {
        const { authors } = await AuthorsService.getAll({ limit: 5, login: debounced });
        return authors;
      }
      return [];
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='w-fit justify-between gap-1 bg-secondary' variant='outline'>
          <span className='hidden md:block'>Advanced filters</span>
          <Icons.filter className='h-5 w-5 md:ml-1' />
        </Button>
      </DialogTrigger>
      <DialogContent className={cn('max-w-[1300px] max-h-[100%]')}>
        <DialogHeader>
          <DialogTitle>Advanced filters</DialogTitle>
        </DialogHeader>
        <div className='space-y-1 md:space-y-2'>
          <div className='relative'>
            <h3 className='ml-2'>Authors</h3>
            <Input
              placeholder='login author..'
              value={value}
              autoFocus={false}
              className='w-[200px] bg-secondary'
              onClick={() => {
                if (!open) {
                  setOpen(true);
                }
              }}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />

            {open && debounced && (
              <div
                ref={handlerRefPopup}
                className={cn('absolute left-0 top-[110%] w-[200px] rounded bg-secondary p-1')}
              >
                {isSuccessAuthors && authors && authors.length > 0 ? (
                  <ul>
                    {authors.map((author) => (
                      <li key={author.id}>
                        <button className='w-full cursor-pointer rounded p-1 px-2 text-start text-sm font-medium transition-colors hover:bg-background/80'>
                          {author.login}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className='p-2'>
                    <h4 className='text-center text-base'>empty</h4>
                  </div>
                )}
                {isLoadingAuthors && (
                  <ul className='space-y-1'>
                    <li>
                      <Skeleton className='h-6 w-full' />
                    </li>
                    <li>
                      <Skeleton className='h-6 w-full' />
                    </li>
                    <li>
                      <Skeleton className='h-6 w-full' />
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
          <div>
            <h3 className='ml-2 text-base font-medium'>Statuses</h3>
            {statuses.length > 0 ? (
              <ul className='flex gap-1'>
                {statuses.map((status) => (
                  <li key={status.id}>
                    <Badge>{status.name}</Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <div>
                <h4 className='text-base'>empty</h4>
              </div>
            )}
          </div>
          <div>
            <h3 className='ml-2 text-base font-medium'>Genres</h3>

            {genres.length > 0 ? (
              <ul className='flex gap-1'>
                {genres.map((genre) => (
                  <li key={genre.id}>
                    <Badge>{genre.title}</Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <div>
                <h4 className='text-base'>empty</h4>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
