'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import { IAuthor } from '@/types/author.types';
import { IGenre } from '@/types/genre.types';
import { IStatus } from '@/types/status.types';

import { AuthorsFiltering } from './authors-filtering';
import { GenresList } from './genres-list';
import { StatusesList } from './statuses-list';

type AdvancedFilteringProps = {
  genres: IGenre[];
  statuses: IStatus[];
};

export enum AdvancedQuerySearchParams {
  GENRE = 'genre',
  AUTHOR = 'author',
  STATUS = 'status',
}

export const AdvancedFiltering: FC<AdvancedFilteringProps> = ({ genres, statuses }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const existedValues = searchParams.getAll(name);

      // @ts-ignore
      const params = new URLSearchParams(searchParams);

      if (existedValues.some((existVal) => existVal === value)) {
        params.delete(name);
        existedValues.forEach((existVal) => {
          if (existVal !== value) {
            params.append(name, existVal);
          }
        });
      } else {
        params.append(name, value);
      }

      return params.toString();
    },
    [searchParams]
  );

  const onClickGenre = (genre: IGenre) => {
    router.push(
      pathname +
        (pathname.includes('?') ? '&' : '?') +
        createQueryString(AdvancedQuerySearchParams.GENRE, genre.title)
    );
  };
  const onClickAuthor = (author: IAuthor) => {
    router.push(
      pathname +
        (pathname.includes('?') ? '&' : '?') +
        createQueryString(AdvancedQuerySearchParams.AUTHOR, author.login)
    );
  };
  const onClickStatus = (status: IStatus) => {
    router.push(
      pathname +
        (pathname.includes('?') ? '&' : '?') +
        createQueryString(AdvancedQuerySearchParams.STATUS, status.name)
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className=' w-fit justify-between gap-1 bg-secondary'>
          <span className='hidden md:block'>Advanced filters</span>
          <Icons.filter className='h-5 w-5 md:ml-1' />
        </Button>
      </DialogTrigger>
      <DialogContent className={cn('max-w-[1300px] max-h-[100%]')}>
        <DialogHeader>
          <DialogTitle>Advanced filters</DialogTitle>
        </DialogHeader>
        <div className='space-y-1 md:space-y-2'>
          <div>
            <h3 className='ml-2'>Authors</h3>
            <AuthorsFiltering
              onClick={onClickAuthor}
              activeAuthors={searchParams.getAll(AdvancedQuerySearchParams.AUTHOR)}
            />
          </div>
          <div>
            <h3 className='ml-2 text-base font-medium'>Statuses</h3>
            <StatusesList
              statuses={statuses}
              onClick={onClickStatus}
              activeStatuses={searchParams.getAll(AdvancedQuerySearchParams.STATUS)}
            />
          </div>
          <div>
            <h3 className='ml-2 text-base font-medium'>Genres</h3>
            <GenresList
              genres={genres}
              onClick={onClickGenre}
              activeGenres={searchParams.getAll(AdvancedQuerySearchParams.GENRE)}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
