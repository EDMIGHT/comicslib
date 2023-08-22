import { allPages } from 'contentlayer/generated';
import { notFound } from 'next/navigation';

import { DocsModal } from '@/components/docs-modal';

const getAboutUsContent = async () => {
  const article = allPages.find((doc) => doc.slugAsParams === 'about-us');

  if (!article) {
    return notFound();
  }

  return article;
};

const Page = async () => {
  const aboutUsContent = await getAboutUsContent();
  return <DocsModal content={aboutUsContent} />;
};

export default Page;
