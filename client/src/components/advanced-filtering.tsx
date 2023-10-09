'use client';

import { useSearchParams } from 'next/navigation';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useChangeSearchParams } from '@/hooks/use-change-search-params';
import { IGenre } from '@/types/genre.types';
import { IStatus } from '@/types/status.types';
import { ITheme } from '@/types/theme.types';

import { AuthorsFiltering } from './authors-filtering';
import { DateFilter } from './date-filter';
import { GenresList } from './genres-list';
import { StatusesList } from './statuses-list';
import { ThemesList } from './themes-list';

type AdvancedFilteringProps = {
  genres: IGenre[];
  statuses: IStatus[];
  themes: ITheme[];
};

export enum AdvancedQuerySearchParams {
  GENRE = 'genre',
  AUTHOR = 'author',
  STATUS = 'status',
  THEME = 'theme',
}

export const AdvancedFiltering: FC<AdvancedFilteringProps> = ({
  genres,
  statuses,
  themes,
}) => {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const [changeSearchParams, resetSearchParams] = useChangeSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const existedValues = searchParams.getAll(name);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
    changeSearchParams(createQueryString(AdvancedQuerySearchParams.GENRE, genreTitle));
  };
  const onClickAuthor = (authorLogin: string) => {
    changeSearchParams(createQueryString(AdvancedQuerySearchParams.AUTHOR, authorLogin));
  };
  const onClickStatus = (statusName: string) => {
    changeSearchParams(createQueryString(AdvancedQuerySearchParams.STATUS, statusName));
  };
  const onClickTheme = (themeTitle: string) => {
    changeSearchParams(createQueryString(AdvancedQuerySearchParams.THEME, themeTitle));
  };
  const resetFilters = () => {
    resetSearchParams();
  };

  const activeGenres = searchParams.getAll(AdvancedQuerySearchParams.GENRE);
  const activeStatuses = searchParams.getAll(AdvancedQuerySearchParams.STATUS);
  const activeAuthors = searchParams.getAll(AdvancedQuerySearchParams.AUTHOR);
  const activeThemes = searchParams.getAll(AdvancedQuerySearchParams.THEME);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' className=' w-fit justify-between gap-1 bg-secondary'>
          <span className='hidden md:block'>Filters</span>
          <Icons.filter className='h-5 w-5 md:ml-1' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[100%] max-w-[1300px]'>
        <DialogHeader>
          <DialogTitle>Advanced filters</DialogTitle>
        </DialogHeader>
        <ScrollArea className='max-h-[80vh]'>
          <div className='space-y-3'>
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
                          className='capitalize'
                        >
                          {activeGen}
                        </Badge>
                      </li>
                    ))
                  ) : (
                    <li key='activeGen_all'>
                      <Badge variant='active' className='capitalize'>
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
                          className='capitalize'
                        >
                          {activeStatus}
                        </Badge>
                      </li>
                    ))
                  ) : (
                    <li key='activeStatus_all'>
                      <Badge variant='active' className='capitalize'>
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
                          className='capitalize'
                        >
                          {activeAuthor}
                        </Badge>
                      </li>
                    ))
                  ) : (
                    <li key='activeAuthor_all'>
                      <Badge variant='active' className='capitalize'>
                        all authors
                      </Badge>
                    </li>
                  )}
                  {activeThemes.length > 0 ? (
                    activeThemes.map((activeTheme) => (
                      <li key={`activeTheme_${activeTheme}`}>
                        <Badge
                          onClick={() => onClickTheme(activeTheme)}
                          variant='active'
                          className='capitalize'
                        >
                          {activeTheme}
                        </Badge>
                      </li>
                    ))
                  ) : (
                    <li key='activeTheme_all'>
                      <Badge variant='active' className='capitalize'>
                        all themes
                      </Badge>
                    </li>
                  )}
                </ul>
              </div>

              {activeAuthors.length +
                activeGenres.length +
                activeStatuses.length +
                activeThemes.length >
                0 && (
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
              <div className='flex flex-wrap gap-2'>
                <div>
                  <h3 className='ml-2 text-base font-medium'>Authors</h3>
                  <AuthorsFiltering
                    onClick={(author) => onClickAuthor(author.login)}
                    activeAuthors={activeAuthors}
                  />
                </div>
                <div>
                  <h3 className='ml-2 text-base font-medium'>By date</h3>
                  <DateFilter />
                </div>
              </div>

              <div>
                <h3 className='ml-2 text-base font-medium'>Statuses</h3>
                <StatusesList
                  statuses={statuses}
                  onClickItem={onClickStatus}
                  activeStatuses={activeStatuses}
                />
              </div>
              <div>
                <h3 className='ml-2 text-base font-medium'>Genres</h3>
                <GenresList
                  genres={genres}
                  onClickItem={(genre) => onClickGenre(genre.title)}
                  activeGenres={activeGenres}
                />
              </div>
              <div>
                <h3 className='ml-2 text-base font-medium'>Themes</h3>
                <ThemesList
                  themes={themes}
                  onClickItem={(theme) => onClickTheme(theme.title)}
                  activeThemes={activeThemes}
                />
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
