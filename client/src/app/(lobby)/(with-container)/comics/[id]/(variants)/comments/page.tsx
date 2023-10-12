import { CommentsSection } from '@/components/comments-section';
import { CreateCommentForm } from '@/components/forms/create-comment-form';
import { getCommentsIds } from '@/lib/get-comments-ids';
import { getAuthServer } from '@/lib/getAuthServer';
import { CommentsService } from '@/services/comments.service';
import { ICommentVoteType } from '@/types/comment.types';

type PageProps = {
  params: {
    id: string;
  };
  searchParams: {
    sort?: string;
    order?: string;
    page?: string;
    limit?: string;
  };
};

const Page = async ({ params: { id }, searchParams }: PageProps) => {
  const { page, limit, sort, order } = searchParams;

  const res = await CommentsService.getAll({
    comicId: id,
    page,
    limit,
    sort,
    order,
  });

  const user = await getAuthServer();

  const requestedCommentsIds = getCommentsIds(res.comments);

  const userCommentsVotes = user
    ? await CommentsService.getUserCommentsVotes(requestedCommentsIds)
    : [];

  const convertedUserCommentsVotes: Record<string, ICommentVoteType | null> = {};
  userCommentsVotes.forEach((item) => {
    convertedUserCommentsVotes[item.commentId] = item.type;
  });

  return (
    <div className='flex flex-col gap-2'>
      {user && <CreateCommentForm comicId={id} />}
      <CommentsSection {...res} convertedUserCommentsVotes={convertedUserCommentsVotes} />
    </div>
  );
};

export default Page;
