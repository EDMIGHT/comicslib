import { CreateCommentForm } from '@/components/forms/create-comment-form';
import { Comment } from '@/components/layouts/comment';
import { Pagination } from '@/components/ui/pagination';
import { LIMITS } from '@/configs/site.configs';
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

  const response = await CommentsService.getAll({ comicId: id, limit, page });

  if (!response) {
    throw new Error();
  }

  return (
    <div className='flex flex-col gap-2'>
      <CreateCommentForm comicId={id} />
      {response && (
        <>
          <ul className='flex flex-col gap-1'>
            {response.comments.map((com) => (
              <li key={com.id}>
                <Comment {...com} />
              </li>
            ))}
          </ul>
          {response.totalPages > 1 && (
            <Pagination
              currentPage={response.currentPage}
              totalPages={response.totalPages}
              className='justify-center'
            />
          )}
        </>
      )}
    </div>
  );
};

export default Page;
