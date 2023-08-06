import Link from 'next/link';
import { FC } from 'react';

import { Time } from '@/components/ui/time';
import { IResponseComment } from '@/types/comment.types';

import { Card } from './ui/card';
import { UserAvatar } from './user-avatar';

type CommentProps = IResponseComment;

export const Comment: FC<CommentProps> = ({ text, user, createdAt }) => {
  return (
    <Card className='flex flex-col gap-2 p-2'>
      <div className='flex items-center gap-2'>
        <Link
          href={`/profile/${user.login}`}
          className='flex items-center gap-2 hover:opacity-75 focus:opacity-75'
        >
          <UserAvatar user={user} />
          <h3 className=''>{user.login}</h3>
        </Link>

        <Time time={new Date(createdAt)} className='text-xs opacity-80' />
      </div>
      <p className='line-clamp-2 '>{text}</p>
    </Card>
  );
};
