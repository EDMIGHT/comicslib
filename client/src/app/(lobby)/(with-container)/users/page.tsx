import { Metadata } from 'next';
import { FC } from 'react';

import { UsersFeed } from '@/components/feeds/users-feed';
import { PageHeader } from '@/components/page-header';
import { Search } from '@/components/search';
import { Sort } from '@/components/sort';
import { USERS_PAGE_META } from '@/configs/meta.configs';
import { SORT_VARIANTS } from '@/configs/site.configs';

type PageProps = {
  searchParams: {
    login?: string;
    sort?: string;
    order?: string;
  };
};

export const metadata: Metadata = {
  title: USERS_PAGE_META.title,
  description: USERS_PAGE_META.desc,
};

const Page: FC<PageProps> = ({ searchParams }) => {
  return (
    <div className='space-y-2'>
      <PageHeader>Search Users</PageHeader>
      <div className='flex flex-col gap-2 md:flex-row'>
        <Search
          className='min-w-[300px] flex-1'
          initialValue={searchParams.login}
          placeholder='enter user login..'
          paramsKey='login'
        />
        <Sort
          variants={SORT_VARIANTS.users}
          initialSort={searchParams.sort}
          initialOrder={searchParams.order}
          contentWidth='260px'
        />
      </div>

      <UsersFeed {...searchParams} />
    </div>
  );
};

export default Page;
