import Link from 'next/link';
import { HTMLAttributes } from 'react';

import { ComicFoldersBtn } from '@/components/comic-folders-btn';
import { ComicUpdateRating } from '@/components/comic-update-rating';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { HREFS } from '@/configs/href.configs';
import { TokenHelper } from '@/lib/helpers/token.helper';
import { cn } from '@/lib/utils';
import { ComicsService } from '@/services/comics.service';
import { UsersService } from '@/services/users.service';
import { IResponseSingleComic } from '@/types/comic.types';

type ComicMenuProps = HTMLAttributes<HTMLDivElement> &
  Pick<IResponseSingleComic, 'first_chapter' | 'id'>;

export const ComicMenu = async ({ id, first_chapter, className, ...rest }: ComicMenuProps) => {
  const accessToken = TokenHelper.getServerAccessToken();

  let rating = null;
  let bookmark = null;

  if (accessToken) {
    rating = await ComicsService.getUserRating(id);
    bookmark = await UsersService.getComicBookmark(id);
  }

  return (
    <div {...rest} className={cn('flex gap-2 w-full', className)}>
      {first_chapter &&
        (bookmark ? (
          <Link
            href={`${HREFS.chapter}/${bookmark.chapterId}/${bookmark.pageNumber}`}
            className={cn(
              buttonVariants(),
              'flex gap-1 items-center font-semibold flex-1 sm:flex-initial'
            )}
          >
            <Icons.read className='h-5 w-5' /> Continue
          </Link>
        ) : (
          <Link
            href={`${HREFS.chapter}/${first_chapter.id}/1`}
            className={cn(
              buttonVariants(),
              'flex gap-1 items-center font-semibold flex-1 sm:flex-initial'
            )}
          >
            <Icons.read className='h-5 w-5' />
            Read
          </Link>
        ))}
      {accessToken && (
        <>
          <ComicFoldersBtn comicId={id} />
          <ComicUpdateRating comicId={id} rating={rating} />
          <Link
            href={`${HREFS.create.chapter}/${id}`}
            className={cn(buttonVariants(), 'flex gap-1 items-center font-semibold')}
          >
            <Icons.upload className='h-5 w-5' />{' '}
            <span className='hidden sm:inline'>Upload Chapter</span>
          </Link>
        </>
      )}
    </div>
  );
};
