import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BookmarksCleaning } from '@/components/bookmarks-cleaning';
import { BookmarksFeed } from '@/components/feeds/bookmarks-feed';
import { PageHeader } from '@/components/page-header';
import { Search } from '@/components/search';
import { getAuthServer } from '@/lib/helpers/getAuthServer';
import { createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('Your bookmarks'),
  description:
    'Track the bookmarks of your comics on a personal bookmarks page for the user. Recall each adventure and take a look at your comic book journey.',
};

type PageProps = {
  searchParams: {
    title?: string;
  };
};

const Page = async ({ searchParams }: PageProps) => {
  const user = await getAuthServer();
  if (!user) {
    return notFound();
  }

  return (
    <div className='flex flex-col gap-2'>
      <PageHeader>Your bookmarks</PageHeader>
      <div className='flex flex-col gap-2 md:flex-row'>
        <Search
          initialValue={searchParams.title}
          placeholder='enter title name..'
          paramsKey='title'
          className='flex-1'
        />
        <BookmarksCleaning />
      </div>
      <BookmarksFeed {...searchParams} login={user.login} currentUser={user} />
    </div>
  );
};

export default Page;
