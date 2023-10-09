import { CreateCommentForm } from '@/components/forms/create-comment-form';
import { Comment } from '@/components/layouts/comment';
import { Pagination } from '@/components/ui/pagination';
import { LIMITS } from '@/configs/site.configs';
import { getCommentsIds } from '@/lib/helpers/get-comments-ids';
import { getAuthServer } from '@/lib/helpers/getAuthServer';
import { CommentsService } from '@/services/comments.service';
import { ICommentVoteType } from '@/types/comment.types';

type PageProps = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | undefined };
};

const Page = async ({ params: { id }, searchParams }: PageProps) => {
  const page = searchParams['page'] ?? '1';
  const limit = searchParams['limit'] ?? LIMITS.comments;

  const { comments, totalPages, currentPage } = await CommentsService.getAll({
    comicId: id,
    limit,
    page,
  });

  const user = await getAuthServer();

  const requestedCommentsIds = getCommentsIds(comments);

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
      <ul className='flex flex-col gap-1'>
        {comments.map((com) => (
          <li key={com.id}>
            <Comment {...com} userVotes={convertedUserCommentsVotes} />
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          className='justify-center'
        />
      )}
    </div>
  );
};

export default Page;
