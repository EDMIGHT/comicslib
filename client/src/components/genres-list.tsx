import { FC } from 'react';

import { Badge } from '@/components/ui/badge';
import { IGenre } from '@/types/genre.types';

type GenresListProps = {
  genres: IGenre[];
  activeGenres?: string[];
  onClick?: (genre: IGenre) => any;
};

export const GenresList: FC<GenresListProps> = ({ genres, onClick, activeGenres }) => {
  return (
    <>
      {genres.length > 0 ? (
        <ul className='flex gap-1'>
          {genres.map((genre) => (
            <li key={genre.id}>
              <Badge
                onClick={() => onClick && onClick(genre)}
                variant={
                  activeGenres?.some((activeGen) => activeGen === genre.title)
                    ? 'active'
                    : 'default'
                }
              >
                {genre.title.toLowerCase()}
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
