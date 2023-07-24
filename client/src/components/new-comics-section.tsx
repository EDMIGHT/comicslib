import React from 'react';

import { IResponseAllComics } from '@/types/comic.types';

import ComicsLine from './comics-line';

const API_HOST = process.env.API_HOST || 'http://localhost:3001/api';

const getComics = async () => {
  try {
    const data = (await fetch(`${API_HOST}/comics`, {
      next: {
        revalidate: 60,
      },
    }).then((res) => res.json())) as IResponseAllComics;

    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    return null;
  }
};

const NewComicsSection = async () => {
  const responseComics = await getComics();

  return (
    <section>
      <h2 className='text-3xl font-medium'>new comics</h2>

      {responseComics && responseComics.comics.length > 0 ? (
        <ComicsLine comics={responseComics.comics} />
      ) : (
        <div>not found😢</div>
      )}
    </section>
  );
};

export default NewComicsSection;
