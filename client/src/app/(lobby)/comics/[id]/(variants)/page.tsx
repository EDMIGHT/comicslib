import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ComicChaptersPagination } from '@/components/comic-chapters-pagination';
import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Time } from '@/components/ui/time';
import { PAGINATION_LIMIT_CONFIG } from '@/configs/site.configs';
import { cn } from '@/lib/utils';
import { ChaptersService } from '@/services/chapters.service';

type PageProps = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | undefined };
};

// TODO как вкладывать ссылку в ссылку без гидратация

const Page = async ({ params: { id }, searchParams }: PageProps) => {
  const page = searchParams['page'] ?? '1';
  const limit = searchParams['limit'] ?? PAGINATION_LIMIT_CONFIG.chapters;

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
                <Card className='flex items-center justify-between gap-2  hover:bg-card/80'>
                  <Link href={`/chapter/${chap.id}`} className='flex-1 p-2'>
                    <h3>
                      Ch. {chap.number} {chap.title && `- ${chap.title}`}
                    </h3>
                  </Link>
                  <div className='flex items-center gap-1'>
                    <Link
                      href={`/profile/${chap.userId}`}
                      className={cn(buttonVariants({ variant: 'ghost' }), 'p-1 h-fit w-fit')}
                    >
                      {chap.user.login}
                    </Link>
                    <Link href={`/chapter/${chap.id}`} className='p-2'>
                      {chap.createdAt && <Time time={new Date(chap.createdAt)} />}
                    </Link>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
          {response.totalPages > 1 && (
            <ComicChaptersPagination
              totalPages={response.totalPages}
              hasNextPage={response.currentPage < response.totalPages}
              hasPrevPage={response.currentPage > 1}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Page;
