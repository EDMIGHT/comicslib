import { Metadata, NextPage } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { ComicGenres } from '@/components/comic-genres';
import { ComicInfo } from '@/components/comic-info';
import { Button } from '@/components/ui/button';
import { ComicsService } from '@/services/comics.service';

type PageProps = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  const { comics } = await ComicsService.getAll();

  return comics.map((comic) => ({ id: comic.id }));
}

export async function generateMetadata({ params: { id } }: PageProps): Promise<Metadata> {
  const data = await ComicsService.getById(id);
  return {
    title: data.title,
  };
}

const ComicPage: NextPage<PageProps> = async ({ params: { id } }) => {
  const comic = await ComicsService.getById(id);

  if (!comic) {
    notFound();
  }

  const { img, title, desc, genres, _count, avgRating } = comic;

  return (
    <div>
      <div className='flex gap-2'>
        <div className='flex flex-col gap-1'>
          <Image src={img} alt={title} width={250} height={250} />
          <Button className='w-full'>read</Button>
          <Button className='w-full bg-secondary'>to folder</Button>
        </div>
        <div className='flex w-full flex-col gap-2'>
          <div className='flex justify-between gap-2'>
            <h1 className='text-2xl'>{title}</h1>
            <ComicInfo avgRating={avgRating} _count={_count} />
          </div>
          <ComicGenres genres={genres} />
          <p>{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default ComicPage;
