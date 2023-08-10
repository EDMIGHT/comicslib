import Link from 'next/link';

import { Button, buttonVariants } from '@/components/ui/button';
import { getServerAccessToken } from '@/lib/helpers/token.helper';
import { cn } from '@/lib/utils';
import { ComicsService } from '@/services/comics.service';

import { ComicFoldersBtn } from './comic-folders-btn';
import { ComicUpdateRating } from './comic-update-rating';
import { Icons } from './ui/icons';

type ComicMenuProps = {
  comicId: string;
};

export const ComicMenu = async ({ comicId }: ComicMenuProps) => {
  const accessToken = getServerAccessToken();

  let rating = null;

  if (accessToken) {
    rating = await ComicsService.getUserRating(comicId);
  }

  return (
    <div className='flex gap-2'>
      <Link
        href={`/chapter/${comicId}/1`}
        className={cn(buttonVariants(), 'flex gap-1 items-center font-semibold')}
      >
        <Icons.read className='h-5 w-5' /> Read
      </Link>
      {accessToken && <ComicFoldersBtn comicId={comicId} />}
      {accessToken && <ComicUpdateRating comicId={comicId} rating={rating} />}
    </div>
  );
};
