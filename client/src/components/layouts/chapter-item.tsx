import Link from 'next/link';
import { FC } from 'react';

import { ChapterUserInfo } from '@/components/chapter-user-info';
import { HREFS } from '@/configs/href.configs';
import { formatTimeToNow } from '@/lib/helpers/formatter.helper';
import { cn } from '@/lib/utils';
import { IChapterWithUser } from '@/types/chapter.types';

type ChapterItemProps = IChapterWithUser & {
  variant?: 'default' | 'transparent';
  className?: string;
};

export const ChapterItem: FC<ChapterItemProps> = ({
  id,
  number,
  title,
  user,
  createdAt,
  variant = 'default',
  className,
}) => {
  const formattedDate = createdAt && formatTimeToNow(new Date(createdAt));

  return (
    <div
      className={cn(
        'grid grid-cols-[1fr_auto] sm:grid-cols-[minmax(250px,_1fr)_auto_150px] items-center justify-between gap-2 shadow-sm transition-colors ',
        variant === 'default' &&
          'rounded border bg-card text-card-foreground hover:bg-card/80',
        variant === 'transparent' && 'border-l-8 border-active hover:bg-active/20',
        className
      )}
    >
      <Link href={`${HREFS.chapter}/${id}`} className=' p-2'>
        <h3 className='max-w-[200px] truncate sm:max-w-[40vw]'>
          Ch. {number} {title && `- ${title}`}
        </h3>
      </Link>

      <div className='hidden sm:block'>
        {user ? (
          <ChapterUserInfo {...user} />
        ) : (
          <h3 className='text-center text-muted-foreground'>deleted</h3>
        )}
      </div>

      <Link href={`${HREFS.chapter}/${id}`} className='p-2 text-center text-sm'>
        {formattedDate}
      </Link>
    </div>
  );
};
