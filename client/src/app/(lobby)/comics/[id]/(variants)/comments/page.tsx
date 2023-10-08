import { CreateCommentForm } from '@/components/forms/create-comment-form';
import { Comment } from '@/components/layouts/comment';
import { Pagination } from '@/components/ui/pagination';
import { LIMITS } from '@/configs/site.configs';
import { getCommentsId } from '@/lib/helpers/get-comments-id';
import { CommentsService } from '@/services/comments.service';

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
  }).catch(() => {
    throw new Error();
  });

  return (
    <div className='flex flex-col gap-2'>
      <CreateCommentForm comicId={id} />
      <ul className='flex flex-col gap-1'>
        {comments.map((com) => (
          <li key={com.id}>
            <Comment {...com} />
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
