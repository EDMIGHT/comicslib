import { Metadata } from 'next';
import { FC } from 'react';

import { CreateAuthorForm } from '@/components/forms/create-author-form';
import { PageHeader } from '@/components/page-header';
import { createTitle } from '@/lib/utils';

type PageProps = {
  searchParams: {
    login: string;
  };
};

export const metadata: Metadata = {
  title: createTitle('Create Author'),
  description:
    "Add an author to your comics! Personalize each story with uniqueness and style. Just enter the author's name and let the creativity begin!",
};

const Page: FC<PageProps> = ({ searchParams: { login } }) => {
  return (
    <div className='space-y-2'>
      <PageHeader>Create Author</PageHeader>
      <CreateAuthorForm initialLogin={login} />
    </div>
  );
};

export default Page;
