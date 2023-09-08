import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { FC, useState } from 'react';

import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { Input } from '@/components/ui/input';
import { HREFS } from '@/configs/href.configs';
import { useClickOutside } from '@/hooks/use-click-outside';
import { useDebounce } from '@/hooks/use-debounce';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { AuthorsService } from '@/services/authors.service';
import { IAuthor } from '@/types/author.types';

import { AuthorSearchSkeletons } from './skeletons/author-search-skeletons';
import { buttonVariants } from './ui/button';

type AuthorsFilteringProps = {
  onClick: (author: IAuthor) => void;
  activeAuthors: string[];
  createAuthorAbility?: boolean;
};

export const AuthorsFiltering: FC<AuthorsFilteringProps> = ({
  onClick,
  activeAuthors,
  createAuthorAbility,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [debounced] = useDebounce(value, 500);

  const handlerRefPopup = useClickOutside(() => setOpen(false));

  const {
    data: authors,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: [REACT_QUERY_KEYS.authors, debounced],
    queryFn: async () => {
      if (debounced) {
        const { authors } = await AuthorsService.getAll({ limit: 5, login: debounced });
        return authors;
      } else return [];
    },
    onError: () => {
      return toast({
        title: 'Oops. Something went wrong!',
        description:
          'An error occurred while trying to search for the author behind your entered values, please try again later',
        variant: 'destructive',
      });
    },
  });

  return (
    <div className='relative'>
      <Input
        placeholder='enter login author..'
        value={value}
        className='w-[240px]'
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
            'absolute left-0 top-[110%] w-[240px] rounded border text-secondary-foreground py-1 px-2 bg-background'
          )}
        >
          <ul className='flex flex-col gap-1'>
            {isSuccess &&
              (authors && authors.length > 0 ? (
                authors.map((author) => (
                  <li key={author.id}>
                    <button
                      type='button'
                      onClick={() => {
                        onClick(author);
                        setOpen(false);
                      }}
                      className={cn(
                        'w-full cursor-pointer rounded p-1 px-2 text-start text-sm font-medium transition-colors ',
                        activeAuthors.some((activeAuthor) => activeAuthor === author.login)
                          ? 'bg-active text-active-foreground'
                          : 'hover:bg-muted/80 focus:bg-muted/80'
                      )}
                    >
                      {author.login}
                    </button>
                  </li>
                ))
              ) : (
                <li>
                  <h4 className=' text-center text-base'>
                    {createAuthorAbility ? (
                      <Link
                        href={`${HREFS.create.author}?login=${debounced}`}
                        className={buttonVariants({ variant: 'link' })}
                      >
                        Author not found, you can add it yourself
                      </Link>
                    ) : (
                      'not found'
                    )}
                  </h4>
                </li>
              ))}
            {(isLoading || isError) && <AuthorSearchSkeletons count={5} />}
          </ul>
        </div>
      )}
    </div>
  );
};
