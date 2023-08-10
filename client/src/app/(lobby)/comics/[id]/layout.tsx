import { Metadata, NextPage } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { ComicCounters } from '@/components/comic-counters';
import { ComicGenres } from '@/components/comic-genres';
import { ComicInfo } from '@/components/comic-info';
import { ComicMenu } from '@/components/comic-menu';
import { ComicNavigation } from '@/components/comic-navigation';
import { Button } from '@/components/ui/button';
import { createTitle } from '@/lib/helpers/general.helper';
import { ComicsService } from '@/services/comics.service';

type PageProps = {
  children: React.ReactNode;
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  const { comics } = await ComicsService.getAll({});

  return comics.map((comic) => ({ id: comic.id }));
}

export async function generateMetadata({ params: { id } }: PageProps): Promise<Metadata> {
  const data = await ComicsService.getById(id);
  return {
    title: createTitle(data.title),
  };
}

const ComicPage: NextPage<PageProps> = async ({ params: { id }, children }) => {
  const comic = await ComicsService.getById(id);

  if (!comic) {
    notFound();
  }

  const { img, title, desc, genres, authors, _count, avgRating, id: comicId, status } = comic;

  return (
    <div className='flex flex-col gap-2 md:gap-4'>
      <div className='flex gap-2 md:gap-4'>
        <div className='relative flex flex-col gap-1 rounded'>
          <Image src={img} alt={title} width={200} height={200} className='rounded' />
        </div>
        <div className='flex w-full flex-col gap-2'>
          <div className='flex justify-between gap-2 pt-2'>
            <h1 className='text-7xl font-bold'>{title}</h1>
            <ComicCounters avgRating={avgRating} _count={_count} />
          </div>

          <div className='mt-auto'>
            <ComicMenu comicId={comicId} />
          </div>
        </div>
      </div>
      <div>
        <p>{desc}</p>
      </div>
      <div className='flex gap-2'>
        <div className='flex flex-1 flex-col gap-2'>
          <ComicNavigation comicId={comicId} />
          {children}
        </div>
        <ComicInfo genres={genres} authors={authors} status={status} />
      </div>
    </div>
  );
};

export default ComicPage;
