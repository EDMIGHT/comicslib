import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { FC, useState } from 'react';

import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { AuthorSearchSkeletons } from '@/components/skeletons/author-search-skeletons';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HREFS } from '@/configs/href.configs';
import { useClickOutside } from '@/hooks/use-click-outside';
import { useDebounce } from '@/hooks/use-debounce';
import { ErrorHandler } from '@/lib/helpers/error-handler.helper';
import { cn } from '@/lib/utils';
import { AuthorsService } from '@/services/authors.service';
import { IAuthor } from '@/types/author.types';
import { isInvalidResponseWithDetails } from '@/types/response.types';

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
    refetch,
  } = useQuery({
    queryKey: [REACT_QUERY_KEYS.authors, debounced],
    queryFn: async () => {
      if (debounced) {
        const { authors } = await AuthorsService.getAll({ limit: 5, login: debounced });
        return authors;
      } else return [];
    },
    onError: (err) => {
      const withDetails =
        err instanceof AxiosError &&
        isInvalidResponseWithDetails(err.response?.data) &&
        err.response?.data;

      ErrorHandler.query(err, {
        validError: {
          title: 'Validation error',
          description:
            (withDetails && withDetails.details[0].msg) ||
            'There was a validation error caused by the server',
        },
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
            'absolute left-0 top-[110%] w-[240px] rounded border text-secondary-foreground p-2 bg-background'
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
            {isLoading && <AuthorSearchSkeletons count={5} />}
            {isError && (
              <li>
                <Button onClick={() => void refetch()} className='w-full' variant='ghost'>
                  Try again
                </Button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
