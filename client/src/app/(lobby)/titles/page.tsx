import { Metadata } from 'next';

import { AdvancedFiltering } from '@/components/advanced-filtering';
import { ComicsFeed } from '@/components/comics-feed';
import { Search } from '@/components/search';
import { Sort } from '@/components/sort';
import { SORT_VARIANTS } from '@/configs/site.configs';
import { createTitle } from '@/lib/helpers/general.helper';
import { GenresService } from '@/services/genres.service';
import { StatusesService } from '@/services/statuses.service';

type PageProps = {
  searchParams: {
    title?: string;
    sort?: string;
    order?: string;
  };
};

export const metadata: Metadata = {
  title: createTitle('Titles'),
  description: 'Advanced search page by titles',
};

const Page = async ({ searchParams }: PageProps) => {
  const genres = await GenresService.getAll();
  const statuses = await StatusesService.getAll();

  return (
    <div className='flex flex-col gap-2'>
      <Search />
      <div className='flex justify-between gap-2'>
        <Sort variants={SORT_VARIANTS.comics} />
        <AdvancedFiltering genres={genres} statuses={statuses} />
      </div>
      <ComicsFeed {...searchParams} />
    </div>
  );
};

export default Page;
