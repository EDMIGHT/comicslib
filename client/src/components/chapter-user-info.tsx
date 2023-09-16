import Link from 'next/link';
import { FC } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Separator } from '@/components/ui/separator';
import { HREFS } from '@/configs/href.configs';
import { cn } from '@/lib/utils';
import { IShortUserWithCounts } from '@/types/user.types';

import { UserAvatar } from './user-avatar';

export const ChapterUserInfo: FC<IShortUserWithCounts> = ({
  img,
  login,
  _count: { chapters, comments, ratings },
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link
          className={cn(buttonVariants({ variant: 'link' }), 'p-0 h-fit')}
          href={`${HREFS.profile}/${login}`}
        >
          {login}
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className='min-w-[240px] space-y-3 p-4'>
        <Link
          className='flex items-center gap-3 transition-all hover:brightness-75'
          href={`${HREFS.profile}/${login}`}
        >
          <UserAvatar img={img} login={login} className='h-16 w-16' />
          <h3 className='line-clamp-2 h-fit break-words p-0 text-xl font-medium'>{login}</h3>
        </Link>
        <Separator />
        <ul className='flex justify-between gap-2'>
          <li>
            <Link href={`${HREFS.profile}/${login}`} className='group'>
              <span className='block font-medium'>{ratings}</span>
              <h5 className='text-xs text-muted-foreground transition-colors group-hover:text-foreground'>
                Rated
              </h5>
            </Link>
          </li>
          <li>
            <Link href={`${HREFS.profile}/${login}/uploads`} className='group'>
              <span className='block font-medium'>{chapters}</span>
              <h5 className='text-xs text-muted-foreground transition-colors group-hover:text-foreground'>
                Uploaded
              </h5>
            </Link>
          </li>
          <li>
            <span className='font-medium'>{comments}</span>
            <h5 className='text-xs text-muted-foreground'>Comments</h5>
          </li>
        </ul>
      </HoverCardContent>
    </HoverCard>
  );
};
