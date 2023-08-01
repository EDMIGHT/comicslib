import { Metadata, NextPage } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { ComicGenres } from '@/components/comic-genres';
import { ComicInfo } from '@/components/comic-info';
import { Button } from '@/components/ui/button';
import { IResponseComic } from '@/types/comic.types';

interface ProductPageProps {
  params: {
    id: string;
  };
}

const API_HOST = process.env.API_HOST || 'http://localhost:3001/api';

const getComic = async (id: string) => {
  try {
    const data = (await fetch(`${API_HOST}/comics/${id}`, {
      next: {
        revalidate: 60,
      },
    }).then((res) => res.json())) as IResponseComic;

    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    return null;
  }
};

// export const metadata: Metadata = {
//   title: '',
//   description: 'Main page',
// };

const ComicPage: NextPage<ProductPageProps> = async ({ params: { id } }) => {
  const comic = await getComic(id);

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
