'use client';

import { useQuery } from '@tanstack/react-query';
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react';

import { SearchComic } from '@/components/layouts/search-comic';
import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { SearchComicSkeletons } from '@/components/skeletons/search-comic-skeletons';
import { CommandDialog, CommandInput } from '@/components/ui/command';
import { LIMITS } from '@/configs/site.configs';
import { useDebounce } from '@/hooks/use-debounce';
import { ErrorHandler } from '@/lib/helpers/error-handler.helper';
import { ComicsService } from '@/services/comics.service';
import { IResponseComic } from '@/types/comic.types';

type SearchComicsProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClickItem?: (comic: IResponseComic) => void;
};

export const SearchComics: FC<SearchComicsProps> = ({ open, setOpen, onClickItem }) => {
  const [value, setValue] = useState('');

  const [debounced] = useDebounce(value, 500);

  const resetDialog = useCallback(() => {
    setOpen(false);
    setValue('');
  }, [setOpen]);

  useEffect(() => {
    if (!open) {
      resetDialog();
    }
  }, [open, resetDialog]);

  const {
    data: searchedComics,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: [REACT_QUERY_KEYS.comics, debounced],
    queryFn: async () => {
      if (debounced) {
        const { comics } = await ComicsService.getAll({
          limit: LIMITS.comicsSearch,
          title: debounced,
        });
        return comics;
      }
      return null;
    },
    onError: (err) => {
      ErrorHandler.query(err);
    },
  });

  const handleClick = (comic: IResponseComic) => {
    onClickItem && onClickItem(comic);
    resetDialog();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder='comic title name..' value={value} onValueChange={setValue} />
      {isLoading && (
        <ul className='flex flex-col gap-1 p-1'>
          <SearchComicSkeletons />
        </ul>
      )}

      {isSuccess &&
        searchedComics &&
        (searchedComics?.length > 0 ? (
          <ul className='flex flex-col gap-1 p-1'>
            {searchedComics.map((comic) => (
              <li key={comic.id}>
                <SearchComic
                  {...comic}
                  onClick={() => {
                    handleClick(comic);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleClick(comic);
                    }
                  }}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className='p-10 text-center '>
            <h2>comics not found</h2>
          </div>
        ))}
    </CommandDialog>
  );
};
