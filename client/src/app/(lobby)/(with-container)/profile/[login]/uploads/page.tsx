import { FC } from 'react';

import { ComicsWithChaptersFeed } from '@/components/feeds/comics-with-chapters-feed';
import { Search } from '@/components/search';
import { Sort } from '@/components/sort';
import { SORT_VARIANTS } from '@/configs/site.configs';

type PageProps = {
  params: {
    login: string;
  };
  searchParams: {
    title?: string;
    sort?: string;
    order?: string;
  };
};

const Page: FC<PageProps> = ({ params: { login }, searchParams }) => {
  return (
    <div className='flex flex-col gap-2'>
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
      <ComicsWithChaptersFeed {...searchParams} fetchQuery='uploaded-by-user' login={login} />
    </div>
  );
};

export default Page;
