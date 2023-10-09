'use client';

import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

import { CreateCommentForm } from '@/components/forms/create-comment-form';
import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { UserAvatar } from '@/components/user-avatar';
import { HREFS } from '@/configs/href.configs';
import { useAuth } from '@/hooks/use-auth';
import { toast } from '@/hooks/use-toast';
import { formatTimeToNow } from '@/lib/helpers/formatter.helper';
import { handleErrorMutation } from '@/lib/helpers/handleErrorMutation';
import { cn } from '@/lib/utils';
import { CommentsService } from '@/services/comments.service';
import { ICommentVoteType, ICommentWithReplies } from '@/types/comment.types';

type CommentBaseProps = Omit<ICommentWithReplies, 'replies'> & {
  withReply?: boolean;
  userVote: ICommentVoteType | null;
};

export const CommentBase: FC<CommentBaseProps> = ({
  id,
  user,
  comicId,
  createdAt,
  text,
  votes,
  userVote,
  withReply = false,
}) => {
  const { user: currentUser } = useAuth();
  const router = useRouter();
  const [showReplyForm, setShowReplyForm] = useState(false);

  const { mutate: countingVote, isLoading } = useMutation({
    mutationKey: [REACT_QUERY_KEYS.comments],
    mutationFn: async (vote: ICommentVoteType) => {
      return await CommentsService.countingVote(id, vote);
    },
    onSuccess: () => {
      router.refresh();
    },
    onError: (err) => {
      handleErrorMutation(err);
    },
  });

  const handleUnauthorizedReq = () => {
    toast({
      title: 'To vote you must be logged in',
      variant: 'destructive',
    });
  };

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
        <Button
          variant='ghost'
          onClick={() => (currentUser ? countingVote('up') : handleUnauthorizedReq())}
          className='group m-0 h-6 px-2 disabled:brightness-75'
          disabled={isLoading}
        >
          <Icons.chevronUp className={cn(userVote === 'up' && 'stroke-green-600')} />
        </Button>
        <span className='px-1 text-center'>{votes}</span>
        <Button
          variant='ghost'
          onClick={() => (currentUser ? countingVote('down') : handleUnauthorizedReq())}
          className='group m-0 h-6 px-2 disabled:brightness-75'
          disabled={isLoading}
        >
          <Icons.chevronDown className={cn(userVote === 'down' && 'stroke-red-600')} />
        </Button>

        {currentUser && withReply && (
          <Button
            onClick={() => setShowReplyForm((prev) => !prev)}
            variant='ghost'
            className='m-0 h-6 px-2'
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
