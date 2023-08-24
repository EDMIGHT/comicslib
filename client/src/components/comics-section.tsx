import { FC } from 'react';

import { IResponseComic } from '@/types/comic.types';

import { ComicsList } from './comics-list';
import { SectionHeader } from './section-header';

type ComicsSectionProps = {
  title?: string;
  comics: IResponseComic[];
};

export const ComicsSection: FC<ComicsSectionProps> = ({ title = 'Comics', comics }) => {
  return (
    <section className='space-y-2'>
      <SectionHeader className='text-2xl font-medium'>{title}</SectionHeader>

      {comics.length > 0 ? <ComicsList comics={comics} /> : <div>not found😢</div>}
    </section>
  );
};
