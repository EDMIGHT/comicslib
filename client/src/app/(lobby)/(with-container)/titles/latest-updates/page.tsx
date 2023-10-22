import { Metadata } from 'next';

import { ComicsWithChaptersFeed } from '@/components/feeds/comics-with-chapters-feed';
import { PageHeader } from '@/components/page-header';
import { Search } from '@/components/search';
import { Sort } from '@/components/sort';
import { TITLES_PAGE_META } from '@/configs/meta.configs';
import { SORT_VARIANTS } from '@/configs/site.configs';

type PageProps = {
  searchParams: {
    title?: string;
    sort?: string;
    order?: string;
  };
};

export const metadata: Metadata = {
  title: TITLES_PAGE_META.latestUpdaters.title,
  description: TITLES_PAGE_META.latestUpdaters.desc,
};

const Page = ({ searchParams }: PageProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <PageHeader>Latest updates</PageHeader>
      <div className='flex flex-col gap-2 md:flex-row'>
        <Search
          initialValue={searchParams.title}
          placeholder='enter title name..'
          paramsKey='title'
          className='min-w-[300px] flex-1'
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

      <ComicsWithChaptersFeed {...searchParams} />
    </div>
  );
};

export default Page;
