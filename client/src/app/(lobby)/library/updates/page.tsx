import { Metadata } from 'next';
import { FC } from 'react';

import { UserComicsWithChaptersFeed } from '@/components/feeds/user-comics-with-chapters-feed';
import { PageHeader } from '@/components/page-header';
import { Search } from '@/components/search';
import { createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('Updates'),
  description:
    'Stay tuned for updates on your comics! Display new releases from your personal collection. Stay up to date!',
};

type PageProps = {
  searchParams: {
    title?: string;
  };
};

const Page: FC<PageProps> = ({ searchParams }) => {
  return (
    <div className='flex flex-col gap-2'>
      <PageHeader>Updates</PageHeader>
      <Search
        initialValue={searchParams.title}
        placeholder='enter title name..'
        paramsKey='title'
      />
      <UserComicsWithChaptersFeed {...searchParams} />
    </div>
  );
};

export default Page;
