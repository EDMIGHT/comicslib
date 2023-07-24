import { NextPage } from 'next';

import { IResponseComic } from '@/types/comic.types';

interface ProductPageProps {
  params: {
    comicId: string;
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

const ComicPage: NextPage<ProductPageProps> = async ({ params: { comicId } }) => {
  const comic = await getComic(comicId);

  return <div>page</div>;
};

export default ComicPage;
