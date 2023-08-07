import Link from 'next/link';

import { Button, buttonVariants } from '@/components/ui/button';
import { getServerAccessToken } from '@/lib/helpers/token.helper';
import { ComicsService } from '@/services/comics.service';

import { ComicUpdateRating } from './comic-update-rating';

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
      <Link href={`/chapter/${comicId}/1`} className={buttonVariants()}>
        read
      </Link>
      <Button>to folder</Button>
      {accessToken && <ComicUpdateRating comicId={comicId} rating={rating} />}
    </div>
  );
};
