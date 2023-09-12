import Link from 'next/link';
import { FC } from 'react';

import { Card } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { UserAvatar } from '@/components/user-avatar';
import { HREFS } from '@/configs/href.configs';
import { cn } from '@/lib/utils';
import { IResponseUser, IUser } from '@/types/user.types';

type UserItemProps = IResponseUser & {
  currentUser: IUser | null;
};

export const UserItem: FC<UserItemProps> = ({
  id,
  img,
  login,
  _count: { comments, ratings },
  currentUser,
}) => {
  const isCurrentUser = currentUser?.id === id;
  return (
    <Card className={cn(isCurrentUser && 'relative bg-active/70')}>
      {isCurrentUser && (
        <span className='absolute -right-2 -top-1 rotate-45 text-xs font-semibold'>YOU</span>
      )}
      <Link
        href={`${HREFS.profile}/${login}`}
        className='flex items-center gap-2 p-2 hover:bg-background/30 focus:bg-background/30'
      >
        <UserAvatar img={img} login={login} />
        <h3 className='flex-1 truncate font-medium'>{login}</h3>
        <div className='flex items-center gap-2'>
          <span className='flex items-center justify-center gap-1'>
            {ratings} <Icons.star className='fill-foreground' />
          </span>
          <span className='flex items-center justify-center gap-1'>
            {comments} <Icons.comment className='fill-foreground' />
          </span>
        </div>
      </Link>
    </Card>
  );
};
