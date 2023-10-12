import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';

import { GenresList } from '@/components/genres-list';
import { StatusBadge } from '@/components/status-badge';
import { ThemesList } from '@/components/themes-list';
import { Badge } from '@/components/ui/badge';
import { HREFS } from '@/configs/href.configs';
import { Formatter } from '@/lib/helpers/formatter.helper';
import { cn } from '@/lib/utils';
import { IResponseComic } from '@/types/comic.types';

type ComicInfoProps = HTMLAttributes<HTMLDivElement> &
  Pick<IResponseComic, 'genres' | 'authors' | 'status' | 'themes' | 'releasedAt'>;

export const ComicInfo: FC<ComicInfoProps> = ({
  authors,
  genres,
  status,
  themes,
  releasedAt,
  className,
  ...rest
}) => {
  const formattedReleasedAtDate = Formatter.time(new Date(releasedAt));

  return (
    <div {...rest} className={cn('flex min-w-[30%] max-w-[300px] flex-col gap-2', className)}>
      {status && (
        <div className='flex items-center gap-1'>
          <h2 className='text-xl font-semibold'>Status:</h2>
          <StatusBadge status={status.name} type='link' />
        </div>
      )}
      {releasedAt && (
        <div>
          <h2 className='text-xl font-semibold'>Released At:</h2>
          <span className='text-sm'>{formattedReleasedAtDate}</span>
        </div>
      )}
      {authors && (
        <div>
          <h2 className='text-xl font-semibold'>Authors:</h2>
          <ul className='flex flex-wrap gap-1'>
            {authors.map(({ id, login }) => (
              <li key={id}>
                <Badge className='capitalize'>
                  <Link href={`${HREFS.comicAttributes.author}/${login}`}>{login}</Link>
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      )}
      {genres && (
        <div>
          <h2 className='text-xl font-semibold'>Genres:</h2>
          <GenresList genres={genres} type='link' />
        </div>
      )}
      {themes && (
        <div>
          <h2 className='text-xl font-semibold'>Themes:</h2>
          <ThemesList themes={themes} type='link' />
        </div>
      )}
    </div>
  );
};
