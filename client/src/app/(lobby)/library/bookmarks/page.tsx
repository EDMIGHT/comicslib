import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BookmarksFeed } from '@/components/bookmarks-feed';
import { PageHeader } from '@/components/page-header';
import { Search } from '@/components/search';
import { createTitle } from '@/lib/helpers/general.helper';
import { getAuthServer } from '@/lib/helpers/getAuthServer';

export const metadata: Metadata = {
  title: createTitle('Your bookmarks'),
  description:
    'Track the bookmarks of your comics on a personal bookmarks page for the user. Recall each adventure and take a look at your comic book journey.',
};

const Page = async () => {
  const user = await getAuthServer();
  if (!user) {
    return notFound();
  }

  return (
    <>
      <PageHeader>Your bookmarks</PageHeader>
      <Search placeholder='enter title name..' paramsKey='title' />
      <BookmarksFeed login={user.login} />
    </>
  );
};

export default Page;
