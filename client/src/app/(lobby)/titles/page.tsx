import { Metadata } from 'next';

import { ComicsFeed } from '@/components/comics-feed';
import { Search } from '@/components/search';
import { Sort } from '@/components/sort';
import { SORT_VARIANTS } from '@/configs/site.configs';
import { createTitle } from '@/lib/helpers/general.helper';

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
  return (
    <div className='flex flex-col gap-2'>
      <Search />
      <div>
        <Sort variants={SORT_VARIANTS.comics} />
      </div>
      <ComicsFeed {...searchParams} />
    </div>
  );
};

export default Page;
