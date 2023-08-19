'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC, useCallback, useState } from 'react';

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
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { IGenre } from '@/types/genre.types';
import { IStatus } from '@/types/status.types';

import { AuthorsFiltering } from './authors-filtering';
import { DateFilter, DateFilterSearchParams } from './date-filter';
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
  const [open, setOpen] = useState(false);
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

  const onClickGenre = (genreTitle: string) => {
    router.push(
      pathname +
        (pathname.includes('?') ? '&' : '?') +
        createQueryString(AdvancedQuerySearchParams.GENRE, genreTitle)
    );
  };
  const onClickAuthor = (authorLogin: string) => {
    router.push(
      pathname +
        (pathname.includes('?') ? '&' : '?') +
        createQueryString(AdvancedQuerySearchParams.AUTHOR, authorLogin)
    );
  };
  const onClickStatus = (statusName: string) => {
    router.push(
      pathname +
        (pathname.includes('?') ? '&' : '?') +
        createQueryString(AdvancedQuerySearchParams.STATUS, statusName)
    );
  };
  const resetFilters = () => {
    router.push(pathname);
  };

  const activeGenres = searchParams.getAll(AdvancedQuerySearchParams.GENRE);
  const activeStatuses = searchParams.getAll(AdvancedQuerySearchParams.STATUS);
  const activeAuthors = searchParams.getAll(AdvancedQuerySearchParams.AUTHOR);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' className=' w-fit justify-between gap-1 bg-secondary'>
          <span className='hidden md:block'>Filters</span>
          <Icons.filter className='h-5 w-5 md:ml-1' />
        </Button>
      </DialogTrigger>
      <DialogContent className={cn('max-w-[1300px] max-h-[100%]')}>
        <DialogHeader>
          <DialogTitle>Advanced filters</DialogTitle>
        </DialogHeader>
        <div className='space-y-1 md:space-y-2'>
          <div>
            <h2 className='ml-2 text-base font-medium'>Selection</h2>
            <ul className='flex flex-wrap gap-1'>
              {activeGenres.length > 0 ? (
                activeGenres.map((activeGen) => (
                  <li key={`activeGen_${activeGen}`}>
                    <Badge
                      onClick={() => onClickGenre(activeGen)}
                      variant='active'
                      className='uppercase'
                    >
                      {activeGen}
                    </Badge>
                  </li>
                ))
              ) : (
                <li key='activeGen_all'>
                  <Badge variant='active' className='uppercase'>
                    all genres
                  </Badge>
                </li>
              )}
              {activeStatuses.length > 0 ? (
                activeStatuses.map((activeStatus) => (
                  <li key={`activeStatus_${activeStatus}`}>
                    <Badge
                      onClick={() => onClickStatus(activeStatus)}
                      variant='active'
                      className='uppercase'
                    >
                      {activeStatus}
                    </Badge>
                  </li>
                ))
              ) : (
                <li key='activeStatus_all'>
                  <Badge variant='active' className='uppercase'>
                    all statuses
                  </Badge>
                </li>
              )}
              {activeAuthors.length > 0 ? (
                activeAuthors.map((activeAuthor) => (
                  <li key={`activeAuthor_${activeAuthor}`}>
                    <Badge
                      onClick={() => onClickAuthor(activeAuthor)}
                      variant='active'
                      className='uppercase'
                    >
                      {activeAuthor}
                    </Badge>
                  </li>
                ))
              ) : (
                <li key='activeAuthor_all'>
                  <Badge variant='active' className='uppercase'>
                    all authors
                  </Badge>
                </li>
              )}
            </ul>
          </div>

          {activeAuthors.length + activeGenres.length + activeStatuses.length > 0 && (
            <Button
              variant='outline'
              onClick={() => {
                resetFilters();
                setOpen(false);
              }}
            >
              Reset
            </Button>
          )}
        </div>
        <Separator />
        <div className='space-y-1 md:space-y-2'>
          <div className='flex gap-2'>
            <div>
              <h3 className='ml-2 text-base font-medium'>Authors</h3>
              <AuthorsFiltering onClick={onClickAuthor} activeAuthors={activeAuthors} />
            </div>
            <div>
              <h3 className='ml-2 text-base font-medium'>By date</h3>
              <DateFilter
                initialVariant={searchParams.get(DateFilterSearchParams.DATE)}
                initialDateFrom={searchParams.get(DateFilterSearchParams.START_DATE)}
                initialDateTo={searchParams.get(DateFilterSearchParams.END_DATE)}
              />
            </div>
          </div>

          <div>
            <h3 className='ml-2 text-base font-medium'>Statuses</h3>
            <StatusesList
              statuses={statuses}
              onClick={onClickStatus}
              activeStatuses={activeStatuses}
            />
          </div>
          <div>
            <h3 className='ml-2 text-base font-medium'>Genres</h3>
            <GenresList genres={genres} onClick={onClickGenre} activeGenres={activeGenres} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
