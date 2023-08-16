import { Metadata } from 'next';
import { FC } from 'react';

import { PageHeader } from '@/components/page-header';
import { Search } from '@/components/search';
import { Sort } from '@/components/sort';
import { UsersFeed } from '@/components/users-feed';
import { SORT_VARIANTS } from '@/configs/site.configs';
import { createTitle } from '@/lib/helpers/general.helper';

type PageProps = {
  searchParams: {
    login?: string;
    sort?: string;
    order?: string;
  };
};

export const metadata: Metadata = {
  title: createTitle('Search Users'),
  description:
    'Find new connections: Searching for members is a great way to find new friends and partners. Use filters for precise selection',
};

const Page: FC<PageProps> = ({ searchParams }) => {
  return (
    <div className='space-y-2'>
      <PageHeader>Search Users</PageHeader>
      <Search
        className='min-w-[300px]'
        initialValue={searchParams.login}
        placeholder='enter user login..'
        paramsKey='login'
      />
      <Sort
        variants={SORT_VARIANTS.users}
        initialSort={searchParams.sort}
        initialOrder={searchParams.order}
        contentWidth='200px'
      />
      <UsersFeed {...searchParams} />
    </div>
  );
};

export default Page;
