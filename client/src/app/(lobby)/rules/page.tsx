import { allPages } from 'contentlayer/generated';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Mdx } from '@/components/mdx/mdx-components';
import { PageHeader } from '@/components/page-header';
import { createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('Rules'),
  description:
    'Guidelines for site usage explained. Familiarize yourself with our terms to ensure a respectful and enriching experience for all users',
};

const getRulesContent = async () => {
  const article = allPages.find((doc) => doc.slugAsParams === 'rules');

  if (!article) {
    return notFound();
  }

  return article;
};

const Page = async () => {
  const rulesContent = await getRulesContent();

  return (
    <div className='space-y-4'>
      <PageHeader>
        Privacy policy{' '}
        <span className='text-end text-base'>({rulesContent.readingTime} min read)</span>
      </PageHeader>
      <Mdx code={rulesContent.body.code} />
    </div>
  );
};

export default Page;
