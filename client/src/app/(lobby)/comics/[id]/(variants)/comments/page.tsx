import { FC } from 'react';

import { CreateCommentForm } from '@/components/forms/create-comment-form';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type PageProps = {
  params: {
    id: string;
  };
};

const Page: FC<PageProps> = ({ params: { id } }) => {
  return (
    <div>
      <CreateCommentForm comicId={id} />
    </div>
  );
};

export default Page;
