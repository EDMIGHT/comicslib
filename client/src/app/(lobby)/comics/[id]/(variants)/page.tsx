import { notFound } from 'next/navigation';

import { ChapterItem } from '@/components/layouts/chapter-item';
import { Pagination } from '@/components/ui/pagination';
import { LIMITS } from '@/configs/site.configs';
import { ChaptersService } from '@/services/chapters.service';

type PageProps = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | undefined };
};

const Page = async ({ params: { id }, searchParams }: PageProps) => {
  const page = searchParams['page'] ?? '1';
  const limit = searchParams['limit'] ?? LIMITS.chapters;

  const response = await ChaptersService.getAll({ comicId: id, limit, page });

  if (!response) {
    return notFound();
  }

  return (
    <div className='flex flex-col gap-2'>
      {response && (
        <>
          <ul className='flex flex-col gap-1'>
            {response.chapters.map((chap) => (
              <li key={chap.id}>
                <ChapterItem {...chap} />
              </li>
            ))}
          </ul>
          {response.totalPages > 1 && (
            <Pagination
              currentPage={response.currentPage}
              totalPages={response.totalPages}
              className='justify-center'
            />
          )}
        </>
      )}
    </div>
  );
};

export default Page;
