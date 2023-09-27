import Link from 'next/link';
import { FC } from 'react';

import { ChapterUserInfo } from '@/components/chapter-user-info';
import { Time } from '@/components/ui/time';
import { HREFS } from '@/configs/href.configs';
import { cn } from '@/lib/utils';
import { IChapterWithUser } from '@/types/chapter.types';

type ChapterItemProps = IChapterWithUser & {
  variant?: 'default' | 'transparent';
};

export const ChapterItem: FC<ChapterItemProps> = ({
  id,
  number,
  title,
  user,
  createdAt,
  variant = 'default',
}) => {
  return (
    <div
      className={cn(
        'grid grid-cols-[1fr_150px] sm:grid-cols-[minmax(250px,_1fr)_auto_150px] items-center justify-between gap-2 shadow-sm transition-colors ',
        variant === 'default' &&
          'rounded border bg-card text-card-foreground hover:bg-card/80',
        variant === 'transparent' && 'border-l-8 border-active hover:bg-active/20'
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

      <Link href={`${HREFS.chapter}/${id}`} className='p-2 text-center'>
        {createdAt && <Time time={new Date(createdAt)} />}
      </Link>
    </div>
  );
};
