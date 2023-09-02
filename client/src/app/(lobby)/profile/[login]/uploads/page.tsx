import { FC } from 'react';

import { UserComicsWithChaptersFeed } from '@/components/feeds/user-comics-with-chapters-feed';
import { UserUploadsFeed } from '@/components/feeds/user-uploads-feed';
import { Search } from '@/components/search';
import { Sort } from '@/components/sort';
import { SORT_VARIANTS } from '@/configs/site.configs';
import { UserService } from '@/services/users.service';

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
          variants={SORT_VARIANTS.comics}
          contentWidth='230px'
          className='w-[230px]'
        />
      </div>
      <UserUploadsFeed login={login} {...searchParams} />
    </div>
  );
};

export default Page;
