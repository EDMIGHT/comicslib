import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { HREFS } from '@/configs/href.configs';
import { getServerAccessToken } from '@/lib/helpers/token.helper';
import { cn } from '@/lib/utils';
import { ComicsService } from '@/services/comics.service';
import { UserService } from '@/services/users.service';
import { IChapter } from '@/types/chapter.types';

import { ComicFoldersBtn } from './comic-folders-btn';
import { ComicUpdateRating } from './comic-update-rating';

type ComicMenuProps = {
  comicId: string;
  chapters: IChapter[];
};

export const ComicMenu = async ({ comicId, chapters }: ComicMenuProps) => {
  const accessToken = getServerAccessToken();

  let rating = null;
  let bookmark = null;

  if (accessToken) {
    rating = await ComicsService.getUserRating(comicId);
    bookmark = await UserService.getComicBookmark(comicId);
  }

  const firstChapter = chapters[0];

  return (
    <div className='flex gap-2'>
      {firstChapter &&
        (bookmark ? (
          <Link
            href={`${HREFS.chapter}/${bookmark.chapterId}/${bookmark.pageNumber}`}
            className={cn(buttonVariants(), 'flex gap-1 items-center font-semibold')}
          >
            <Icons.read className='h-5 w-5' /> Continue
          </Link>
        ) : (
          <Link
            href={`${HREFS.chapter}/${firstChapter.id}/1`}
            className={cn(buttonVariants(), 'flex gap-1 items-center font-semibold')}
          >
            <Icons.read className='h-5 w-5' /> Read
          </Link>
        ))}
      {accessToken && (
        <>
          <ComicFoldersBtn comicId={comicId} />
          <ComicUpdateRating comicId={comicId} rating={rating} />
          <Link
            href={`${HREFS.create.chapter}/${comicId}`}
            className={cn(buttonVariants(), 'flex gap-1 items-center font-semibold')}
          >
            <Icons.upload className='h-5 w-5' /> Upload Chapter
          </Link>
        </>
      )}
    </div>
  );
};
