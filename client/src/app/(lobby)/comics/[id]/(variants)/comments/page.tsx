import { CommentFeed } from '@/components/comment-feed-infinity';
import { CreateCommentForm } from '@/components/forms/create-comment-form';
import { CommentsService } from '@/services/comments.service';

type PageProps = {
  params: {
    id: string;
  };
};

const Page = async ({ params: { id } }: PageProps) => {
  const comments = await CommentsService.getAll({ comicId: id });

  return (
    <div className='flex flex-col gap-2'>
      <CreateCommentForm comicId={id} />
      <CommentFeed comicId={id} initialComments={comments} />
    </div>
  );
};

export default Page;
