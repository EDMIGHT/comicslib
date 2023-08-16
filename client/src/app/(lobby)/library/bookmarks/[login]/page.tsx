import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FC } from 'react';

import { BookmarksCleaning } from '@/components/bookmarks-cleaning';
import { BookmarksFeed } from '@/components/bookmarks-feed';
import { PageHeader } from '@/components/page-header';
import { Search } from '@/components/search';
import { createTitle } from '@/lib/helpers/general.helper';
import { getAuthServer } from '@/lib/helpers/getAuthServer';
import { getServerAccessToken } from '@/lib/helpers/token.helper';
import { UserService } from '@/services/users.service';

type PageProps = {
  params: {
    login: string;
  };
};

export async function generateMetadata({ params: { login } }: PageProps): Promise<Metadata> {
  return {
    title: createTitle(`${login} bookmarks`),
    description: `Open ${login}'s bookmarks and dive into his comic preferences.`,
  };
}

const Page: FC<PageProps> = async ({ params: { login } }) => {
  const existedUser = await UserService.get(login);
  if (!existedUser) {
    return notFound();
  }

  let currentUser = null;
  if (getServerAccessToken()) {
    currentUser = await getAuthServer();
  }

  return (
    <>
      <PageHeader>{login} bookmarks</PageHeader>
      <div className='flex flex-col gap-2 md:flex-row'>
        <Search placeholder='enter title name..' paramsKey='title' className='flex-1' />
        {currentUser && currentUser.login === existedUser.login && <BookmarksCleaning />}
      </div>
      <BookmarksFeed login={existedUser.login} currentUser={currentUser} />
    </>
  );
};

export default Page;
