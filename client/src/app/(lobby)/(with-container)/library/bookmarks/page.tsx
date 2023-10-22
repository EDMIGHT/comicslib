import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BookmarksCleaning } from '@/components/bookmarks-cleaning';
import { BookmarksFeed } from '@/components/feeds/bookmarks-feed';
import { PageHeader } from '@/components/page-header';
import { Search } from '@/components/search';
import { LIBRARY_PAGES_META } from '@/configs/meta.configs';
import { getAuthServer } from '@/lib/getAuthServer';

export const metadata: Metadata = {
  title: LIBRARY_PAGES_META.bookmarks.title,
  description: LIBRARY_PAGES_META.bookmarks.desc,
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
