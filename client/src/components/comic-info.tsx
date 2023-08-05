import { FC } from 'react';

import { Badge } from '@/components/ui/badge';
import { IAuthor } from '@/types/author.types';
import { IGenre } from '@/types/genre.types';

type ComicInfoProps = {
  genres: IGenre[];
  authors: IAuthor[];
};

export const ComicInfo: FC<ComicInfoProps> = ({ authors, genres }) => {
  return (
    <div className='flex min-w-[25%] max-w-[400px] flex-col gap-2'>
      {authors && (
        <div>
          <h2 className='text-xl font-semibold'>Authors:</h2>
          <ul className='flex flex-wrap gap-1'>
            {authors.map(({ id, login }) => (
              <li key={id}>
                <Badge className='uppercase'>{login}</Badge>
              </li>
            ))}
          </ul>
        </div>
      )}
      {genres && (
        <div>
          <h2 className='text-xl font-semibold'>Genres:</h2>
          <ul className='flex flex-wrap gap-1'>
            {genres.map(({ id, title }) => (
              <li key={id}>
                <Badge className='uppercase'>{title}</Badge>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
