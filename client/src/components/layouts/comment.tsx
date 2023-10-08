import { FC } from 'react';

import { CommentBase } from '@/components/comment-base';
import { Card } from '@/components/ui/card';
import { IResponseComment } from '@/types/comment.types';

export const Comment: FC<IResponseComment> = ({ replies, ...comment }) => {
  return (
    <Card variant='transparent' className='flex flex-col gap-2'>
      <CommentBase {...comment} withReply />
      <div className='ml-5 border-l-2 border-l-active'>
        {replies.map((user) => (
          <CommentBase key={user.id} {...user} />
        ))}
      </div>
    </Card>
  );
};
