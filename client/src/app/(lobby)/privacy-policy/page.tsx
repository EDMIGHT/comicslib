import { allPages } from 'contentlayer/generated';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Mdx } from '@/components/mdx/mdx-components';
import { PageHeader } from '@/components/page-header';
import { createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('Privacy policy'),
  description:
    'Your privacy matters. Learn how we safeguard your data and ensure a secure online experience. Explore our commitment to your information.',
};

const getPrivacyPolicyContent = async () => {
  const article = allPages.find((doc) => doc.slugAsParams === 'privacy-policy');

  if (!article) {
    return notFound();
  }

  return article;
};

export const dynamic = 'force-static';

const Page = async () => {
  const privacyPolicyContent = await getPrivacyPolicyContent();

  return (
    <div className='space-y-4'>
      <PageHeader>
        Privacy policy{' '}
        <span className='text-end text-base'>
          ({privacyPolicyContent.readingTime} min read)
        </span>
      </PageHeader>
      <Mdx code={privacyPolicyContent.body.code} />
    </div>
  );
};

export default Page;
