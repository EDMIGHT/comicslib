'use client';

import Link from 'next/link';
import { FC, useState } from 'react';

import { CreateCommentForm } from '@/components/forms/create-comment-form';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { UserAvatar } from '@/components/user-avatar';
import { HREFS } from '@/configs/href.configs';
import { formatTimeToNow } from '@/lib/helpers/formatter.helper';
import { IResponseComment } from '@/types/comment.types';

type CommentBaseProps = Omit<IResponseComment, 'replies'> & {
  withReply?: boolean;
};

export const CommentBase: FC<CommentBaseProps> = ({
  id,
  user,
  comicId,
  createdAt,
  text,
  votes,
  withReply = false,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const dateToNow = formatTimeToNow(new Date(createdAt));

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

        <span className='text-xs opacity-80'>{dateToNow}</span>
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
          <Button
            onClick={() => setShowReplyForm((prev) => !prev)}
            variant='ghost'
            className='m-0 h-fit px-2 py-1'
          >
            Reply
          </Button>
        )}
      </div>
      {showReplyForm && (
        <CreateCommentForm
          parentCommentId={id}
          comicId={comicId}
          onConfirm={() => {
            setShowReplyForm(false);
          }}
        />
      )}
    </div>
  );
};
