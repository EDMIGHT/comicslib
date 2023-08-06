import Image from 'next/image';
import { notFound } from 'next/navigation';

import { ChapterPagination } from '@/components/chapter-pagination';
import { PageBackground } from '@/components/page-background';
import { PagesService } from '@/services/pages.service';

type PageProps = {
  params: {
    slug: string[];
  };
};

const Page = async ({ params: { slug } }: PageProps) => {
  const chapterId = slug[0];
  const page = slug[1] ?? '1';

  const response = await PagesService.get({ chapterId, page });

  if (!response) {
    return notFound();
  }

  return (
    <div>
      <div>
        <ChapterPagination
          page={+page}
          chapterId={chapterId}
          totalPages={response.totalPages}
        />
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
