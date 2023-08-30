import { allPages } from 'contentlayer/generated';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Mdx } from '@/components/mdx/mdx-components';
import { PageHeader } from '@/components/page-header';
import { createTitle } from '@/lib/utils';

type PageProps = {
  params: {
    slug: string[];
  };
};

const getPageContentFromParams = async (params: PageProps['params']) => {
  const slug = params.slug.join('/') ?? '';

  return allPages.find((page) => page.slugAsParams === slug);
};

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const content = await getPageContentFromParams(params);

  if (!content) {
    return {};
  }

  return {
    title: createTitle(content.title),
    description: content.description,
  };
};

export const generateStaticParams = async () => {
  return allPages.map((page) => ({
    slug: page.slugAsParams.split('/'),
  }));
};

const Page = async ({ params }: PageProps) => {
  const content = await getPageContentFromParams(params);

  if (!content) {
    notFound();
  }

  return (
    <div className='space-y-4'>
      <PageHeader>
        {content.title}{' '}
        <span className='text-end text-base'>({content.readingTime} min read)</span>
      </PageHeader>
      <Mdx code={content.body.code} />
    </div>
  );
};

export default Page;
