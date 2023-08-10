import React from 'react';

import { ComicsService } from '@/services/comics.service';

import { ComicsList } from './comics-list';

const NewComicsSection = async () => {
  const responseComics = await ComicsService.getAll({ page: 1 });

  return (
    <section>
      <h2 className='text-3xl font-medium'>new comics</h2>

      {responseComics && responseComics.comics.length > 0 ? (
        <ComicsList comics={responseComics.comics} />
      ) : (
        <div>not found😢</div>
      )}
    </section>
  );
};

export default NewComicsSection;
