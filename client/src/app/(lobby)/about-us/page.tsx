import { allPages } from 'contentlayer/generated';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Mdx } from '@/components/mdx/mdx-components';
import { PageHeader } from '@/components/page-header';
import { createTitle } from '@/lib/utils';

// ! https://github.com/vercel/next.js/issues/49662

const getAboutUsContent = async () => {
  const article = allPages.find((doc) => doc.slugAsParams === 'about-us');

  if (!article) {
    return notFound();
  }

  return article;
};

export const metadata: Metadata = {
  title: createTitle('About Us'),
  description:
    'Learn about our path, values and team. Find out what drives us to strive for excellence and innovation in everything we do.',
};

const Page = async ({}) => {
  const aboutUsContent = await getAboutUsContent();

  return (
    <div className='space-y-4'>
      <PageHeader>About us</PageHeader>
      <Mdx code={aboutUsContent.body.code} />
    </div>
  );
};

export default Page;
