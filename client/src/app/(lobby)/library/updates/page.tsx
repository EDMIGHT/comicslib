import { Metadata } from 'next';
import { FC } from 'react';

import { UserComicsWithChaptersFeed } from '@/components/feeds/user-comics-with-chapters-feed';
import { PageHeader } from '@/components/page-header';
import { Search } from '@/components/search';
import { Sort } from '@/components/sort';
import { SORT_VARIANTS } from '@/configs/site.configs';
import { createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('Updates'),
  description:
    'Stay tuned for updates on your comics! Display new releases from your personal collection. Stay up to date!',
};

type PageProps = {
  searchParams: {
    title?: string;
    sort?: string;
    order?: string;
  };
};

const Page: FC<PageProps> = ({ searchParams }) => {
  return (
    <div className='flex flex-col gap-2'>
      <PageHeader>Updates</PageHeader>
      <div className='flex flex-col gap-2 md:flex-row'>
        <Search
          initialValue={searchParams.title}
          placeholder='enter title name..'
          paramsKey='title'
          className='flex-1'
        />
        <Sort
          initialSort={searchParams.sort}
          initialOrder={searchParams.order}
          variants={SORT_VARIANTS.comicsWithChapters}
          defaultVariantNumber={4}
          contentWidth='230px'
          className='w-[230px]'
        />
      </div>
      <UserComicsWithChaptersFeed {...searchParams} />
    </div>
  );
};

export default Page;
