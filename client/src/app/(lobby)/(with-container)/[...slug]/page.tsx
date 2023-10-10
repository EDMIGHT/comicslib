import { allPages } from 'contentlayer/generated';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Mdx } from '@/components/mdx/mdx-components';
import { PageHeader } from '@/components/page-header';
import { OPENGRAPHS_URLS } from '@/configs/site.configs';
import { absoluteUrl, createTitle } from '@/lib/utils';

type PageProps = {
  params: {
    slug: string[];
  };
};

// eslint-disable-next-line @typescript-eslint/require-await
const getPageContentFromParams = async (params: PageProps['params']) => {
  const slug = params.slug.join('/') ?? '';

  return allPages.find((page) => page.slugAsParams === slug);
};

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const content = await getPageContentFromParams(params);

  if (!content) {
    return {};
  }

  const ogUrl = new URL(OPENGRAPHS_URLS.page);
  ogUrl.searchParams.set('title', content.title);
  ogUrl.searchParams.set('type', 'Document');
  ogUrl.searchParams.set('mode', 'dark');

  return {
    title: createTitle(content.title),
    description: content.description,
    openGraph: {
      title: content.title,
      description: content.description,
      type: 'article',
      url: absoluteUrl(content.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: content.title,
        },
      ],
    },
  };
};

// eslint-disable-next-line @typescript-eslint/require-await
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
