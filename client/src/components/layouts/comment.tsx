import { FC } from 'react';

import { CommentBase } from '@/components/layouts/comment-base';
import { Card } from '@/components/ui/card';
import { ICommentVoteType, ICommentWithReplies } from '@/types/comment.types';

type CommentProps = ICommentWithReplies & {
  userVotes: Record<string, ICommentVoteType | null>;
};

export const Comment: FC<CommentProps> = ({ replies, userVotes, ...comment }) => {
  return (
    <Card variant='transparent' className='flex flex-col gap-2'>
      <CommentBase {...comment} userVote={userVotes[comment.id] ?? null} withReply />
      <div className='ml-7 border-l-2 border-l-active'>
        {replies.map((reply) => (
          <CommentBase key={reply.id} {...reply} userVote={userVotes[reply.id] ?? null} />
        ))}
      </div>
    </Card>
  );
};
