import { format } from 'date-fns';
import { FC } from 'react';

import { Badge } from '@/components/ui/badge';
import { IResponseComic } from '@/types/comic.types';

import { GenresList } from './genres-list';
import { StatusBadge } from './status-badge';

type ComicInfoProps = Pick<IResponseComic, 'genres' | 'authors' | 'status' | 'releasedAt'>;

export const ComicInfo: FC<ComicInfoProps> = ({ authors, genres, status, releasedAt }) => {
  return (
    <div className='flex min-w-[30%] max-w-[300px] flex-col gap-2'>
      {status && (
        <div className='flex items-center gap-1'>
          <h2 className='text-xl font-semibold'>Status:</h2>
          <StatusBadge status={status.name} />
        </div>
      )}
      {releasedAt && (
        <div>
          <h2 className='text-xl font-semibold'>Released At:</h2>
          <span className='text-sm'>{format(new Date(releasedAt), 'PPP')}</span>
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
          <GenresList genres={genres} />
        </div>
      )}
    </div>
  );
};
