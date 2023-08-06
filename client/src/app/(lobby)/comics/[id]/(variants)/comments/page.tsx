import { notFound } from 'next/navigation';

import { Comment } from '@/components/comment';
import { CreateCommentForm } from '@/components/forms/create-comment-form';
import { Pagination } from '@/components/pagination';
import { PAGINATION_LIMIT_CONFIG } from '@/configs/site.configs';
import { CommentsService } from '@/services/comments.service';

type PageProps = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | undefined };
};

const Page = async ({ params: { id }, searchParams }: PageProps) => {
  const page = searchParams['page'] ?? '1';
  const limit = searchParams['limit'] ?? PAGINATION_LIMIT_CONFIG.comments;

  const response = await CommentsService.getAll({ comicId: id, limit, page });

  if (!response) {
    return notFound();
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
              initialLimit={PAGINATION_LIMIT_CONFIG.comments}
              totalPages={response.totalPages}
              hasNextPage={response.currentPage < response.totalPages}
              hasPrevPage={response.currentPage > 1}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Page;
