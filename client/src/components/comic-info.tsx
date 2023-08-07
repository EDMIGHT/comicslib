import { FC } from 'react';

import { Badge } from '@/components/ui/badge';
import { IAuthor } from '@/types/author.types';
import { IGenre } from '@/types/genre.types';
import { IStatus } from '@/types/status.types';

type ComicInfoProps = {
  genres: IGenre[];
  authors: IAuthor[];
  status: IStatus;
};

export const ComicInfo: FC<ComicInfoProps> = ({ authors, genres, status }) => {
  return (
    <div className='flex min-w-[25%] max-w-[400px] flex-col gap-2'>
      {status && (
        <div className='flex items-center gap-1'>
          <h2 className='text-xl font-semibold'>Status:</h2>
          <Badge className='h-fit uppercase'>{status.name}</Badge>
        </div>
      )}
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
