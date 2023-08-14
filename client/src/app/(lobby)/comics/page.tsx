import { Metadata } from 'next';

import { AdvancedFiltering } from '@/components/advanced-filtering';
import { ComicsFeed } from '@/components/comics-feed';
import { PageHeader } from '@/components/page-header';
import { Search } from '@/components/search';
import { Sort } from '@/components/sort';
import { BackBtn } from '@/components/ui/back-btn';
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
  title: createTitle('Advanced search'),
  description:
    'Explore a vast collection of comics and enhance your search with advanced filtering options. Find your favorite comics easily with our comprehensive search page.',
};

const Page = async ({ searchParams }: PageProps) => {
  const genres = await GenresService.getAll();
  const statuses = await StatusesService.getAll();

  return (
    <div className='flex flex-col gap-2'>
      <PageHeader title='Advanced search' />
      <div className='flex justify-between gap-2'>
        <Search className='min-w-[300px] flex-1' initialTitle={searchParams.title} />
        <AdvancedFiltering genres={genres} statuses={statuses} />
      </div>
      <Sort
        initialSort={searchParams.sort}
        initialOrder={searchParams.order}
        variants={SORT_VARIANTS.comics}
      />
      <ComicsFeed {...searchParams} />
    </div>
  );
};

export default Page;
