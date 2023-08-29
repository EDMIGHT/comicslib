import Link from 'next/link';
import { FC } from 'react';

import { Time } from '@/components/ui/time';
import { HREFS } from '@/configs/href.configs';
import { cn } from '@/lib/utils';
import { IChapterWithUser } from '@/types/chapter.types';

import { ChapterUserInfo } from '../chapter-user-info';

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
  // TODO найти причину гидратации при вложенной ссылке в ссылку (ChapterUserInfo)
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-2 shadow-sm transition-colors ',
        variant === 'default' &&
          'rounded border bg-card text-card-foreground hover:bg-card/80',
        variant === 'transparent' && 'border-l-8 border-active hover:bg-active/20'
      )}
    >
      <Link href={`${HREFS.chapter}/${id}`} className='flex-1 p-2'>
        <h3 className='w-[250px] truncate'>
          Ch. {number} {title && `- ${title}`}
        </h3>
      </Link>
      <div className='flex items-center gap-1'>
        <ChapterUserInfo {...user} />
        <Link href={`${HREFS.chapter}/${id}`} className='p-2'>
          {createdAt && <Time time={new Date(createdAt)} />}
        </Link>
      </div>
    </div>
  );
};
