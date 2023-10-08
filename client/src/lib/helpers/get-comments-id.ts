import { ICommentWithReplies, IResponseAllComments } from '@/types/comment.types';

export const getCommentsId = (comments: IResponseAllComments['comments']): string[] => {
  const commentsId: string[] = [];

  const processCommentsId = (commentsArray: ICommentWithReplies[]) => {
    for (const comment of commentsArray) {
      commentsId.push(comment.id);

      if (comment.replies && comment.replies.length > 0) {
        processCommentsId(comment.replies);
      }
    }
  };

  processCommentsId(comments);

  return commentsId;
};
