import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';

import { useClickOutside } from '@/hooks/use-click-outside';
import { useDebounce } from '@/hooks/use-debounce';
import { cn } from '@/lib/utils';
import { AuthorsService } from '@/services/authors.service';
import { IAuthor } from '@/types/author.types';

import { Input } from './ui/input';
import { Skeleton } from './ui/skeleton';

type AuthorsFilteringProps = {
  onClick: (genre: IAuthor) => any;
  activeAuthors: string[];
};

export const AuthorsFiltering: FC<AuthorsFilteringProps> = ({ onClick, activeAuthors }) => {
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
      } else return [];
    },
  });

  return (
    <div className='relative'>
      <Input
        placeholder='enter login author..'
        value={value}
        autoFocus={false}
        className='w-[200px] bg-secondary text-secondary-foreground'
        onClick={() => {
          if (!open) {
            setOpen(true);
          }
        }}
        onChange={(e) => {
          setValue(e.target.value);
          setOpen(true);
        }}
      />

      {open && debounced && (
        <div
          ref={handlerRefPopup}
          className={cn(
            'absolute left-0 top-[110%] w-[200px] rounded bg-secondary text-secondary-foreground p-1'
          )}
        >
          {isSuccessAuthors && authors && authors.length > 0 ? (
            <ul>
              {authors.map((author) => (
                <li key={author.id}>
                  <button
                    onClick={() => onClick(author)}
                    className={cn(
                      'w-full cursor-pointer rounded p-1 px-2 text-start text-sm font-medium transition-colors ',
                      activeAuthors.some((activeAuthor) => activeAuthor === author.login)
                        ? 'bg-active text-active-foreground'
                        : 'hover:bg-background/80 focus:bg-background/80'
                    )}
                  >
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
  );
};
