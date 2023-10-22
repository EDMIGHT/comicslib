import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { CreateChapterForm } from '@/components/forms/create-chapter-form';
import { PageHeader } from '@/components/page-header';
import { StatusBadge } from '@/components/status-badge';
import { Card, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { HREFS } from '@/configs/href.configs';
import { ComicsService } from '@/services/comics.service';

type PageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params: { id } }: PageProps): Promise<Metadata> {
  const existedComic = await ComicsService.getById(id);

  if (!existedComic) {
    return {};
  }

  return {
    title: `Create a chapter for the ${existedComic.title}`,
    description: `Page for creating a chapter for a comic with a title: ${existedComic.title}`,
  };
}

const Page = async ({ params: { id } }: PageProps) => {
  const existedComic = await ComicsService.getById(id);

  if (!existedComic) {
    return notFound();
  }

  return (
    <div className='space-y-4'>
      <PageHeader>Upload Chapter</PageHeader>
      <Card variant='transparent' as='section' className='space-y-2'>
        <CardTitle className='text-2xl'>Comic Details</CardTitle>
        <Link href={`${HREFS.comics}/${id}`}>
          <Card className='grid grid-cols-[auto_1fr] gap-2 p-2 hover:bg-card/80'>
            <Image
              src={existedComic.img}
              alt={existedComic.title}
              width={70}
              height={50}
              className='rounded object-contain'
            />
            <div className='flex flex-col justify-between gap-1 py-1'>
              <div className='space-y-1'>
                <h2 className='max-w-md truncate text-xl font-semibold'>
                  {existedComic.title}
                </h2>
                <StatusBadge
                  status={existedComic.status.name}
                  className='w-fit px-0'
                  variant='transparent'
                />
              </div>
              <span className='text-sm'>
                released at {new Date(existedComic.releasedAt).toLocaleDateString()}
              </span>
            </div>
          </Card>
        </Link>
      </Card>
      <Separator />
      <CreateChapterForm comicId={id} />
    </div>
  );
};

export default Page;
