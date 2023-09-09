import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { BookmarkComicControl } from '@/components/bookmark-comic-control';
import { ChapterControl } from '@/components/chapter-control';
import { PageBackground } from '@/components/page-background';
import { getServerAccessToken } from '@/lib/helpers/token.helper';
import { createTitle } from '@/lib/utils';
import { ChaptersService } from '@/services/chapters.service';
import { UsersService } from '@/services/users.service';

type PageProps = {
  params: {
    slug: string[];
  };
};

export async function generateMetadata({ params: { slug } }: PageProps): Promise<Metadata> {
  const chapterId = slug[0];
  const page = slug[1] ?? '1';

  const { chapter } = await ChaptersService.getPage({ chapterId, page });

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

  const response = await ChaptersService.getPage({ chapterId, page });
  const { chapter } = response;
  const isAuth = getServerAccessToken();

  if (!response) {
    return notFound();
  }

  let bookmark;
  if (isAuth) {
    bookmark = await UsersService.getComicBookmark(chapter.comicId);
  }

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
        <div className='flex items-center gap-2'>
          {isAuth && (
            <BookmarkComicControl
              chapterId={chapter.id}
              comicId={chapter.comicId}
              pageNumber={page}
              bookmark={bookmark}
            />
          )}
          <ChapterControl comicId={chapter.comicId} currentChapterId={chapter.id} />
        </div>
      </div>
      <PageBackground
        page={+page}
        comicId={chapter.comicId}
        chapterId={chapterId}
        totalPages={response.totalPages}
        nextChapter={response.nextChapter}
        prevChapter={response.prevChapter}
      >
        <div className='relative min-h-screen w-auto'>
          <Image src={response.img} alt={`${page} page`} fill className='object-contain' />
        </div>
      </PageBackground>
    </div>
  );
};

export default Page;
