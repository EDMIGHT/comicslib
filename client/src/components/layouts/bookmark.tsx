import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { HREFS } from '@/configs/href.configs';
import { Formatter } from '@/lib/helpers/formatter.helper';
import { IResponseBookmark, IUser } from '@/types/user.types';

import { BookmarkComicDelete } from '../bookmark-comic-deleting';

type BookmarkProps = IResponseBookmark & {
  currentUser: IUser | null;
};

export const Bookmark: FC<BookmarkProps> = ({
  comic,
  page,
  chapter,
  updatedAt,
  currentUser,
  userId,
}) => {
  const formattedDate = Formatter.timeToNow(new Date(updatedAt));

  return (
    <Card className='flex gap-2 p-2'>
      <Link
        href={`${HREFS.comics}/${comic.id}`}
        className='flex flex-1 gap-2 hover:opacity-80'
      >
        <div className='relative h-[80px] w-[56px] overflow-hidden rounded'>
          <Image
            src={comic.img}
            alt={comic.title}
            fill
            className='object-cover object-center'
          />
        </div>
        <div className='flex h-full flex-col justify-between gap-1'>
          <h2 className='text-xl font-medium'>{comic.title}</h2>
          <p className='text-sm'>
            Ch. {chapter.number} {chapter.title ? ` - ${chapter.title}` : ''}
          </p>
          <span className='text-sm'>{formattedDate}</span>
        </div>
      </Link>

      <div className='flex flex-col justify-between gap-2'>
        {currentUser?.id === userId && (
          <>
            <BookmarkComicDelete comicId={comic.id} />
            <Link
              href={`${HREFS.chapter}/${chapter.id}/${page.number}`}
              className={buttonVariants()}
            >
              continue
            </Link>
          </>
        )}
      </div>
    </Card>
  );
};
