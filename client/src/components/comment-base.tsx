import Link from 'next/link';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Time } from '@/components/ui/time';
import { UserAvatar } from '@/components/user-avatar';
import { HREFS } from '@/configs/href.configs';
import { IResponseComment } from '@/types/comment.types';

type CommentBaseProps = Omit<IResponseComment, 'replies'> & {
  withReply?: boolean;
};

export const CommentBase: FC<CommentBaseProps> = ({
  user,
  createdAt,
  text,
  votes,
  withReply = false,
}) => {
  return (
    <div className='flex flex-col gap-2 p-2'>
      <div className='flex items-center gap-2'>
        <Link
          href={`${HREFS.profile}/${user.login}`}
          className='flex items-center gap-2 hover:opacity-75 focus:opacity-75'
        >
          <UserAvatar img={user.img} login={user.login} />
          <h3>{user.login}</h3>
        </Link>

        <Time time={new Date(createdAt)} className='text-xs opacity-80' />
      </div>
      <p className='break-words pl-2'>{text}</p>
      <div className='flex items-center gap-1'>
        <button className='group px-2'>
          <Icons.chevronUp className='group-hover:stroke-green-600 group-focus:stroke-green-600' />
        </button>
        <span className='text-center'>{votes}</span>
        <button className='group px-2'>
          <Icons.chevronDown className='group-hover:stroke-red-600 group-focus:stroke-red-600' />
        </button>

        {withReply && (
          <Button variant='ghost' className='m-0 h-fit px-2 py-1'>
            Reply
          </Button>
        )}
      </div>
    </div>
  );
};
