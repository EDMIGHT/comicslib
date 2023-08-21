import { notFound } from 'next/navigation';
import { FC } from 'react';

import { PageHeader } from '@/components/page-header';
import { TopComics } from '@/components/top-comics';
import { ComicsService } from '@/services/comics.service';

type PageProps = {
  params: {
    title?: string;
  };
};

const Page = async ({ params: { title } }: PageProps) => {
  const topComics = await ComicsService.getAll({
    genres: title,
    limit: 6,
  });

  if (!topComics) {
    return notFound();
  }

  return (
    <div>
      <PageHeader>{title}</PageHeader>
      <TopComics comics={topComics.comics} />
    </div>
  );
};

export default Page;
