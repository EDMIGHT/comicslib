import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FC, HTMLAttributes } from 'react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { IGenre } from '@/types/genre.types';

type GenresListProps = HTMLAttributes<HTMLUListElement> & {
  genres: IGenre[];
  activeGenres?: string[];
  onClick?: (genreTitle: string) => any;
  type?: 'default' | 'link';
};

export const GenresList: FC<GenresListProps> = ({
  genres,
  onClick,
  activeGenres,
  className,
  type = 'default',
  ...rest
}) => {
  return (
    <>
      {genres.length > 0 ? (
        <ul {...rest} className={cn('flex gap-1', className)}>
          {genres.map((genre) => (
            <li key={genre.id}>
              <Badge
                onClick={() =>
                  // onClick ? onClick(genre.title) : redirect(`/genre/${genre.title}`)
                  onClick && onClick(genre.title)
                }
                className='uppercase'
                variant={
                  activeGenres?.some((activeGen) => activeGen === genre.title)
                    ? 'active'
                    : 'default'
                }
              >
                {type === 'link' && (
                  <Link href={`/genre/${genre.title}`}>{genre.title.toLowerCase()}</Link>
                )}
                {type === 'default' && genre.title.toLowerCase()}
              </Badge>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <h4 className='text-base'>empty</h4>
        </div>
      )}
    </>
  );
};
