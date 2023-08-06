import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ChapterControl } from '@/components/chapter-control';
import { PageBackground } from '@/components/page-background';
import { createTitle } from '@/lib/helpers/general.helper';
import { PagesService } from '@/services/pages.service';

type PageProps = {
  params: {
    slug: string[];
  };
};

export async function generateMetadata({ params: { slug } }: PageProps): Promise<Metadata> {
  const chapterId = slug[0];
  const page = slug[1] ?? '1';

  const { chapter } = await PagesService.get({ chapterId, page });

  if (!chapter) {
    return notFound();
  }

  const title = chapter.title ? `- ${chapter.title}` : null;

  return {
    title: createTitle(`Ch. ${chapter.number} ${title ? title : ''}`),
  };
}

const Page = async ({ params: { slug } }: PageProps) => {
  const chapterId = slug[0];
  const page = slug[1] ?? '1';

  const response = await PagesService.get({ chapterId, page });

  if (!response) {
    return notFound();
  }

  const { chapter } = response;

  return (
    <div>
      <div className='container flex items-center justify-between gap-2'>
        <Link
          href={`/comics/${chapter.comic.id}`}
          className='p-1 hover:opacity-80 focus:opacity-80'
        >
          <h1 className='text-xl font-semibold'>{chapter.comic.title}</h1>
          <h2 className='text-sm'>
            Ch. {chapter.number} {chapter.title ? `- ${chapter.title}` : null}
          </h2>
        </Link>
        <div className='font-semibold'>
          {page}/{response.totalPages}
        </div>
        <div>
          <ChapterControl comicId={chapter.comic.id} currentChapterId={chapter.id} />
        </div>

        {/* <ChapterPagination
          page={+page}
          chapterId={chapterId}
          totalPages={response.totalPages}
        /> */}
      </div>
      <PageBackground page={+page} chapterId={chapterId} totalPages={response.totalPages}>
        <div className='relative min-h-screen w-auto'>
          <Image src={response.img} alt={`${page} page`} fill className='object-contain' />
        </div>
      </PageBackground>
    </div>
  );
};

export default Page;
