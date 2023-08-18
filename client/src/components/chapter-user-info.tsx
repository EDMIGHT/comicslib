import Link from 'next/link';
import { FC } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';
import { IShortUser } from '@/types/user.types';

import { UserAvatar } from './user-avatar';

export const ChapterUserInfo: FC<IShortUser> = ({ img, login }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link
          className={cn(buttonVariants({ variant: 'link' }), 'p-0 h-fit')}
          href={`/profile/${login}`}
        >
          {login}
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className='w-fit p-2'>
        <div className='flex items-center justify-between space-x-4'>
          <UserAvatar img={img} login={login} />
          <h3 className='max-w-[200px] truncate font-medium'>{login}</h3>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
