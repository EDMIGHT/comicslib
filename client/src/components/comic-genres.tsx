import { FC } from 'react';

import { Badge } from '@/components/ui/badge';
import { IResponseComic } from '@/types/comic.types';

export const ComicGenres: FC<Pick<IResponseComic, 'genres'>> = ({ genres }) => {
  return (
    <ul className='flex flex-wrap gap-1'>
      {genres.length > 0 && genres.map(({ id, title }) => <Badge key={id}>{title}</Badge>)}
    </ul>
  );
};
