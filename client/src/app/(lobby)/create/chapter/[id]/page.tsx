import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FC } from 'react';

import { PageHeader } from '@/components/page-header';
import { SectionHeader } from '@/components/section-header';
import { Card } from '@/components/ui/card';
import { createTitle } from '@/lib/utils';
import { ComicsService } from '@/services/comics.service';

type PageProps = {
  params: {
    id: string;
  };
};

export const metadata: Metadata = {
  title: createTitle('Upload Chapter'),
  description:
    'Turn your ideas into comics! Download a new chapter and unravel the plot. Easily and conveniently create your worlds on the pages of each chapter.',
};

const Page = async ({ params: { id } }: PageProps) => {
  const existedComic = await ComicsService.getById(id);

  if (!existedComic) {
    return notFound();
  }

  return (
    <div className='space-y-2'>
      <PageHeader>Upload Chapter</PageHeader>
      <section>
        <SectionHeader>Comic Details</SectionHeader>
        <Card className='grid grid-cols-[auto_1fr] gap-2 p-2'>
          <Image
            src={existedComic.img}
            alt={existedComic.title}
            width={70}
            height={50}
            className='rounded object-contain'
          />
          <div>
            <h2>{existedComic.title}</h2>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Page;
