import Link from 'next/link';
import { FC } from 'react';

import { UserDetailsHoc } from '@/components/hocs/user-details-hoc';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
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
        'grid grid-cols-[1fr_150px] items-center justify-between gap-x-2 gap-y-1 px-2 py-1 shadow-sm transition-colors ',
        variant === 'default' &&
          'rounded border bg-card text-card-foreground hover:bg-card/80',
        variant === 'transparent' && 'border-l-4 border-active hover:bg-active/20',
        className
      )}
    >
      <Link
        href={`${HREFS.chapter}/${id}`}
        className='row-span-2 flex h-full w-full items-center'
      >
        <h3 className='line-clamp-2 break-words'>
          Ch. {number} {title && `- ${title}`}
        </h3>
      </Link>

      <Link href={`${HREFS.chapter}/${id}`} className='flex items-center justify-start'>
        <Icons.clock className='mr-1 h-4 w-4' />
        <span className='text-sm'>{formattedDate}</span>
      </Link>
      <div className='col-start-2'>
        {user ? (
          <UserDetailsHoc user={user}>
            <Link
              className={cn(
                buttonVariants({ variant: 'link' }),
                'p-0 h-fit break-all items-center'
              )}
              href={`${HREFS.profile}/${user.login}`}
            >
              <Icons.user className='mr-1 h-4 w-4' />
              {user.login}
            </Link>
          </UserDetailsHoc>
        ) : (
          <h3 className='flex cursor-not-allowed items-center justify-start text-muted-foreground'>
            <Icons.user className='mr-1 h-4 w-4' />
            deleted
          </h3>
        )}
      </div>
    </div>
  );
};
