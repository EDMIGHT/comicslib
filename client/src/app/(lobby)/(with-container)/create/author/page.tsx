import { Metadata } from 'next';
import { FC } from 'react';

import { CreateAuthorForm } from '@/components/forms/create-author-form';
import { PageHeader } from '@/components/page-header';
import { CREATE_PAGES_META } from '@/configs/meta.configs';

type PageProps = {
  searchParams: {
    login: string;
  };
};

export const metadata: Metadata = {
  title: CREATE_PAGES_META.author.title,
  description: CREATE_PAGES_META.author.desc,
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
