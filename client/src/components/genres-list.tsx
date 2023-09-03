'use client';

import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';

import { Badge } from '@/components/ui/badge';
import { HREFS } from '@/configs/href.configs';
import { cn } from '@/lib/utils';
import { IGenre } from '@/types/genre.types';

type GenresListProps = HTMLAttributes<HTMLUListElement> & {
  genres: IGenre[];
  activeGenres?: string[];
  onClickItem?: (genre: IGenre) => void;
  type?: 'default' | 'link';
};

export const GenresList: FC<GenresListProps> = ({
  genres,
  onClickItem,
  activeGenres,
  className,
  type = 'default',
  ...rest
}) => {
  return (
    <>
      {genres.length > 0 ? (
        <ul {...rest} className={cn('flex flex-wrap gap-1', className)}>
          {genres.map((genre) => (
            <li key={genre.id}>
              <Badge
                onClick={() => onClickItem && onClickItem(genre)}
                className='capitalize'
                variant={
                  activeGenres?.some((activeGen) => activeGen === genre.title)
                    ? 'active'
                    : 'default'
                }
              >
                {type === 'link' && (
                  <Link href={`${HREFS.comicAttributes.genre}/${genre.title}`}>
                    <h4>{genre.title}</h4>
                  </Link>
                )}
                {type === 'default' && <h4>{genre.title}</h4>}
              </Badge>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <h4 className='text-base'>no genres</h4>
        </div>
      )}
    </>
  );
};
