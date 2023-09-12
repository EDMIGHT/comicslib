import { ComicsFeed } from '@/components/feeds/comics-feed';
import { Search } from '@/components/search';
import { Sort } from '@/components/sort';
import { SORT_VARIANTS } from '@/configs/site.configs';
import { ISortArg } from '@/types/response.types';

type PageProps = {
  params: {
    login: string;
  };
  searchParams: ISortArg & {
    title?: string;
  };
};

const Page = ({ params: { login }, searchParams }: PageProps) => {
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
          variants={SORT_VARIANTS.comics}
          contentWidth='230px'
          className='w-[230px]'
        />
      </div>
      <ComicsFeed ratedUser={login} {...searchParams} />
    </div>
  );
};

export default Page;
