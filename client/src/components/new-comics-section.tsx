import React from 'react';

import { ComicsService } from '@/services/comics.service';

import { ComicsLine } from './comics-line';

const NewComicsSection = async () => {
  const responseComics = await ComicsService.getAll();

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
