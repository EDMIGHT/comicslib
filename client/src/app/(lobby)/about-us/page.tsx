import { allPages } from 'contentlayer/generated';
import { notFound } from 'next/navigation';

import { Mdx } from '@/components/mdx/mdx-components';
import { PageHeader } from '@/components/page-header';

async function getAboutUsContent() {
  const article = allPages.find((doc) => doc.slugAsParams === 'about-us');

  if (!article) {
    return notFound();
  }

  return article;
}

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
